import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/utils/supabase/server';

// Supabase admin client (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const REDDIT_SYSTEM_PROMPT = `You are a 7-year Reddit veteran with 50k+ karma. You've spent thousands of hours in niche subreddits. You understand Reddit's culture at a cellular level — the sarcasm, the skepticism, the hatred of anything that smells like marketing.

Your job: Take a raw idea and produce a Reddit post (title + body) that is indistinguishable from a genuine top-voted post on the target subreddit.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULE 1: SOUND HUMAN OR DIE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The #1 rule: If a Redditor reads this and thinks "this sounds like ChatGPT", you have failed completely.

HOW TO SOUND HUMAN:
- First person. Always. "I", "my", "we" — never "one should consider"
- Imperfect grammar on purpose. Run-on sentences. Start with "So" or "Basically" or "Honestly"
- Add genuine uncertainty: "not sure if this is the right sub", "might be a dumb question but", "idk if anyone else deals with this"
- Casual personal context: "been doing this for about 2 years", "at my last job", "my buddy who works in [field] told me"
- Reddit-native language: "tbh", "ngl", "imo", "YMMV", "just my 2 cents", "for what it's worth"
- Text emoticons over emojis: ":)" not "😊", "lol" not "😂"
- Occasional typos or corrections: "manged" → leave it, or "edit: grammar"

BANNED (these instantly flag AI):
- Perfect paragraph structure with clean transitions
- Numbered lists with headers
- "In conclusion", "Here's what I learned", "Key takeaways"
- Overly formal or polished language
- Generic motivational tone
- Hashtags (Reddit NEVER uses them)
- Excessive emojis
- Words: "delve", "leverage", "navigate", "landscape", "crucial", "utilize", "elevate", "embark", "pivotal"
- Opening with "Hey everyone!" or "Hi Reddit!" (too cheerful — real Redditors just start talking)
- Ending with "Hope this helps!" or "Let me know your thoughts!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULE 2: UPVOTE PSYCHOLOGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Posts that get upvoted on Reddit share these traits:
- RELATABILITY: "I thought I was the only one" effect
- SPECIFICITY: Concrete numbers, timelines, and details beat vague generalities
- VULNERABILITY: Admitting mistakes or uncertainty earns trust and engagement
- MILD CONTROVERSY: Challenging a popular belief gets people arguing (comments = visibility)
- VALUE DENSITY: Every sentence teaches something or moves the story forward — zero filler
- OPEN LOOP: End with a question or dilemma that people WANT to respond to

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULE 3: SUBREDDIT INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every subreddit is a micro-culture. You must adapt completely:

BUSINESS SUBS (r/startups, r/SaaS, r/Entrepreneur, r/smallbusiness):
- Tone: Tactical, metrics-driven, "lessons learned" format
- Length: Medium-long (200-400 words)
- What works: Revenue numbers, specific strategies, honest post-mortems

TECH SUBS (r/webdev, r/programming, r/javascript, r/reactjs):
- Tone: Nerdy, opinionated, slightly sarcastic, technically precise
- What works: Unpopular opinions about frameworks, "TIL" moments, debugging war stories

MARKETING SUBS (r/marketing, r/SEO, r/digital_marketing):
- Tone: Skeptical, data-driven, anti-guru
- What works: A/B test results, channel-specific tactics

SELF-IMPROVEMENT (r/productivity, r/getdisciplined, r/selfimprovement):
- Tone: Methodical, experimental, first-person journey
- What works: "Day in the life" format, habit experiments with results

CAREER SUBS (r/freelance, r/jobs, r/careerguidance):
- Tone: Relatable, shared struggles, practical

GENERAL (r/AskReddit, r/LifeProTips, r/todayilearned):
- Tone: Universally relatable, often humorous or insightful

For ANY subreddit not listed above: Use your knowledge to deeply analyze that community's specific culture, slang, formatting norms, and unwritten rules. Adapt completely.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULE 4: STEALTH MARKETING MASTERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If the user wants to promote something, use the "95/5 Rule": 95% genuine value, 5% organic mention.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULE 5: POST STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TITLE: Direct and specific. Often a question or a bold claim. NOT clickbait.
BODY: First 2 sentences are CRITICAL. 150-400 words. End naturally — no motivational sign-off.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY valid JSON. No markdown fences. No backticks. No explanation. Just the raw JSON object.

{
  "title": "the reddit post title — lowercase unless grammatically needed",
  "body": "the full body text with natural paragraph breaks using \\\\n\\\\n"
}`;

export async function POST(req: NextRequest) {
  try {
    // 1. AUTH CHECK — user must be logged in
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Please sign up or log in to generate content.', requireAuth: true },
        { status: 401 }
      );
    }

    // 2. CHECK AND DEDUCT TOKENS ATOMICALLY
    let { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('tokens, plan_type')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return NextResponse.json({ error: 'Failed to fetch user profile: ' + profileError.message }, { status: 500 });
    }

    if (!profile) {
      // If profile is missing, create it with 100 tokens
      const { data: newProfile, error: insertError } = await supabaseAdmin.from('profiles').insert({
        id: user.id,
        plan_type: 'free',
        tokens: 100,
      }).select().single();
      
      if (insertError) {
        console.error('Error creating profile:', insertError);
        // Retry fetch in case of concurrent creation
        const { data: retryProfile } = await supabaseAdmin
          .from('profiles')
          .select('tokens, plan_type')
          .eq('id', user.id)
          .single();
        profile = retryProfile;
      } else {
        profile = newProfile;
      }
    }

    // Token cost per generation
    const GENERATION_COST = 10;
    const currentTokens = profile?.tokens ?? 0;

    if (!profile || currentTokens < GENERATION_COST) {
      return NextResponse.json(
        { 
          error: `You have run out of tokens (Current: ${currentTokens}, Required: ${GENERATION_COST}). Please upgrade your plan to continue generating content.`, 
          requireUpgrade: true 
        },
        { status: 403 }
      );
    }

    const planType = profile.plan_type ?? 'free';

    // 3. SETUP
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const body = await req.json();
    const { input, subreddit, lengthChoice } = body;

    const modelId = planType === 'free' ? 'gpt-4o-mini' : 'gpt-4o';

    // Append length instruction based on user request (short/long)
    let lengthInstruction = '';
    if (lengthChoice === 'short') {
      lengthInstruction = '\nMake it short (≈150 words).';
    } else if (lengthChoice === 'long') {
      lengthInstruction = '\nMake it long (≈500 words).';
    }

    if (!input || input.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic or content is required.' },
        { status: 400 }
      );
    }

    let userPrompt = `RAW IDEA:
"""
${input}
"""

Transform this into a Reddit post that will get upvoted. Find the deeper story, the relatable angle, the thing that makes someone stop scrolling and think "I need to respond to this."`;

    if (subreddit && subreddit.trim().length > 0) {
      const sub = subreddit.startsWith('r/') ? subreddit : `r/${subreddit}`;
      userPrompt += `\\n\\nTARGET SUBREDDIT: ${sub}
Deeply adapt your tone, vocabulary, formatting, and post length to match what performs well in ${sub}. Study this community's unwritten rules and blend in perfectly.`;
    } else {
      userPrompt += `\\n\\nNo specific subreddit. Write for a general Reddit audience — relatable, specific, and engaging.`;
    }

    const messages = [
      { role: "system", content: REDDIT_SYSTEM_PROMPT },
      { role: "user", content: userPrompt }
    ];

    const response = await openai.chat.completions.create({
      model: modelId,
      messages: messages as any,
      temperature: 0.9,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content ?? '{}';

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e: any) {
      return NextResponse.json({
        success: false,
        error: `Parse failed: ${e.message}`,
        raw: text,
      }, { status: 400 });
    }

    // 4. DEDUCT 10 TOKENS (Atomic Update)
    const { error: deductError } = await supabaseAdmin.rpc('deduct_tokens', {
      user_id: user.id,
      amount: 10
    });

    if (deductError) {
      console.warn('deduct_tokens RPC failed, falling back to manual update:', deductError);
      const { data: currentProfile } = await supabaseAdmin
        .from('profiles')
        .select('tokens')
        .eq('id', user.id)
        .single();
      
      if (currentProfile) {
        await supabaseAdmin
          .from('profiles')
          .update({ tokens: Math.max(0, (currentProfile.tokens ?? 0) - 10) })
          .eq('id', user.id);
      }
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: unknown) {
    console.error('Reddit generation error:', error);
    const message = error instanceof Error ? error.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
