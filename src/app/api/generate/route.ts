import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/utils/supabase/server';

// Supabase admin client initialization moved inside POST handler for fresh env vars

// ── Rich tone definitions injected into the user prompt ──
const TONE_DEFINITIONS: Record<string, string> = {
  influencer: `TONE: INFLUENCER — Write like a high-energy creator with 500k+ followers. Confident, slightly provocative, uses "you" directly. Pattern-interrupt openers. Short punchy rhythm. Speaks from authority but stays relatable. Think: someone who gets paid to post. Uses rhetorical questions. Ends with a bold takeaway the reader wants to screenshot.`,
  ceo: `TONE: CEO / EXECUTIVE — Write like a founder who's built and exited companies. Measured confidence, not hype. Data-aware. Uses specific numbers and timelines ("In Q3 we saw...", "After 14 months of..."). Strategic framing. No fluff, no motivational cliches. Speaks to other operators and decision-makers. The reader should feel like they're getting insider intel from someone who's done the work.`,
  storyteller: `TONE: STORYTELLER — Write as a narrative craftsman. Open with a vivid scene or a single moment in time ("It was 2 AM. My phone buzzed."). Use tension, pacing, and emotional beats. Build toward a twist or realization. The reader should feel something — surprise, recognition, discomfort, or hope. Every sentence should make them need the next one. End on the lesson, not a lecture.`,
  academic: `TONE: ACADEMIC / THOUGHT LEADER — Write like a researcher who also knows how to communicate. Use evidence-based framing ("Studies show...", "The data suggests..."). Nuanced takes, not black-and-white claims. Acknowledge complexity. Reference frameworks, mental models, or first principles. The reader should feel smarter after reading. Avoid jargon for jargon's sake — explain concepts cleanly.`,
  default: `TONE: NATURAL — Write in a clean, authentic, conversational voice. Not overly polished, not sloppy. The kind of writing that feels effortless but is actually carefully crafted. Varied sentence lengths. Direct language. No corporate-speak, no influencer hype. Just a smart person sharing a genuine thought clearly and compellingly.`,
};

const SYSTEM_PROMPT = `You are PostPilot's AI engine — an elite social media ghostwriter who has studied thousands of viral posts across LinkedIn, X (Twitter), and Threads. Your job is to take raw, messy, half-formed ideas and transform them into scroll-stopping content that sounds unmistakably human.

You are NOT a generic AI assistant. You are a specialized content weapon.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1: ANTI-AI DETECTION (NON-NEGOTIABLE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BANNED WORDS & PHRASES (using any of these = immediate failure):
"Delve", "In conclusion", "Here's a breakdown", "Let's explore", "Let's dive in", "Fast forward to today", "Navigating the complexities", "Remember,", "Elevate", "Unleash", "Game-changer", "Embark", "Tapestry", "Realm", "Pivotal", "It's worth noting", "At the end of the day", "In today's world", "In this digital age", "It goes without saying", "Without further ado", "Each and every", "Pros and cons"

BANNED PATTERNS:
- Perfect 5-paragraph essay structure
- Opening with a greeting ("Hey everyone!", "Hi there!", "Hello LinkedIn!")
- Closing with motivational platitudes ("Keep pushing!", "You've got this!", "The sky's the limit!")
- Using more than 1-2 emojis per post (prefer zero)
- Hashtags (unless user explicitly requests them)
- Bullet points that are too clean and symmetrical (vary your formatting)

WHAT TO DO INSTEAD:
- Write like a real person typing on their laptop at midnight
- Use sentence fragments. Start with "And". Start with "But".
- Vary rhythm: short punch. Then a longer, more reflective sentence that breathes.
- Be specific over generic: "I lost $12,400" beats "I lost money"
- Use lowercase occasionally for casual emphasis
- Add real human hesitation: "honestly", "look", "here's the thing", "I almost didn't share this"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2: ABSOLUTE TRANSFORMATION RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEVER just echo or lightly rephrase the user's input. Your entire value is the transformation. Even if the user gives you a single sentence like "I got an arrear in engineering", you must:
1. Find the DEEPER universal story inside it (failure → growth, shame → resilience, unexpected lessons)
2. Build a complete narrative arc: Hook → Context → Tension → Insight → Engagement closer
3. Add specific, believable details that make it feel lived-in
4. Make the reader see themselves in the story

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3: WRITING DNA PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When the user provides past writing samples ("Writing DNA"), perform a deep behavioral extraction:

EXTRACT THESE SIGNALS:
- Sentence length distribution (choppy vs. flowing)
- Formatting DNA (bullet points? numbered lists? all-caps emphasis? dash separators? line breaks?)
- Emotional temperature (aggressive / vulnerable / analytical / witty / deadpan)
- Vocabulary tier (simple everyday words vs. intellectual terminology)
- Signature phrases or verbal tics they repeat
- How they open posts (question? bold claim? scene-setting?)
- How they close posts (question? CTA? mic-drop? trailing thought?)

THEN: Force your new output into their exact psychological envelope. The user should read it and feel: "This sounds exactly like me."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4: PLATFORM-SPECIFIC MASTERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### LINKEDIN POST
STRUCTURE:
- Line 1-2: The HOOK. Must create an open loop or emotional jolt.
- Body: 1-2 sentences per paragraph MAX. Aggressive line breaks. 150-300 words total.
- Final line: A specific question that invites the reader to share their own experience.

### X (TWITTER) SINGLE POST
CONSTRAINT: Strictly under 280 characters. Count carefully.

### X (TWITTER) THREAD
OPTIMAL LENGTH: 5-7 tweets. Never fewer than 4, never more than 9.
- Tweet 1 (THE HOOK): Must create massive curiosity or promise outsized value.
- Tweets 2-6 (THE BODY): Each tweet is a self-contained insight.
- Final Tweet (THE CLOSER): Summarize the key takeaway in one powerful line.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5: IMAGE INPUT PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When the user uploads an image (screenshot, notes, whiteboard, etc.):
1. Extract ALL visible text, ideas, and concepts from the image
2. Identify the core message or insight buried in the raw content
3. Treat the extracted content as your primary source material
4. Apply the full transformation pipeline above

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6: OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY valid JSON. No markdown code fences. No backticks. No explanation text. Just the raw JSON object.

Use \\n for line breaks within strings.

{
  "linkedin": {
    "post": "The fully formatted LinkedIn post with \\n line breaks.",
    "hooks": ["Structurally different hook option 1", "Different format hook option 2", "Different angle hook option 3"]
  },
  "twitter": {
    "post": "The single tweet, MUST be under 280 characters.",
    "hooks": ["Alt tweet angle 1", "Alt tweet angle 2", "Alt tweet angle 3"]
  },
  "thread": {
    "tweets": ["Tweet 1 - the hook", "Tweet 2", "Tweet 3", "Tweet 4", "Tweet 5", "Tweet 6 - the closer"],
    "hooks": ["Alt thread opener 1", "Alt thread opener 2", "Alt thread opener 3"]
  }
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

    // Initialize Supabase admin client (bypasses RLS) inside handler for fresh env vars
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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

    // 3. SETUP OPENAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const body = await req.json();
    const { input, platform, tone, writingDNA, image } = body;

    const modelId = planType === 'free' ? 'gpt-4o-mini' : 'gpt-4o';

    if ((!input || input.trim().length === 0) && !image) {
      return NextResponse.json(
        { error: 'Input content or an image is required.' },
        { status: 400 }
      );
    }

    let userPrompt = `SOURCE MATERIAL:
"""
${input || '[No text provided — see attached image]'}
"""

TRANSFORM this into scroll-stopping, engagement-optimized social media content. Find the deeper story, the universal insight, the emotional hook that makes people stop scrolling.`;

    if (platform && platform !== 'all') {
      const platformNames: Record<string, string> = {
        linkedin: 'LinkedIn Post',
        twitter: 'X (Twitter) Single Post',
        thread: 'X (Twitter) Thread',
      };
      userPrompt += `\n\nTARGET: ${platformNames[platform] || platform} ONLY.
Generate content ONLY for the "${platform}" key in your JSON. Set other platform keys to null.`;
    } else {
      userPrompt += `\n\nTARGET: All platforms. Generate optimized, platform-native content for LinkedIn, X Post, and Thread simultaneously.`;
    }

    const toneKey = tone || 'default';
    const toneInstruction = TONE_DEFINITIONS[toneKey] || TONE_DEFINITIONS['default'];
    userPrompt += `\n\n${toneInstruction}`;

    if (writingDNA && writingDNA.trim().length > 0) {
      userPrompt += `\n\n━━ WRITING DNA SAMPLES (HIGHEST PRIORITY — match this voice exactly) ━━\n${writingDNA}\n━━ END DNA ━━\nYou MUST clone the style, rhythm, vocabulary, and emotional register from these samples.`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT }
    ];

    if (image) {
      const imageUrl = image.startsWith('data:image') ? image : `data:image/jpeg;base64,${image}`;
      messages.push({
        role: "user",
        content: [
          { type: "text", text: userPrompt + '\n\nAn image has been uploaded. Extract any text, ideas, or content from this image and use it as the primary source material for generating the social media content.' },
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: userPrompt
      });
    }

    const response = await openai.chat.completions.create({
      model: modelId,
      messages: messages,
      temperature: 0.85,
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
    // We already checked the balance, now we perform the actual deduction
    const { error: deductError } = await supabaseAdmin.rpc('deduct_tokens', {
      user_id: user.id,
      amount: 10
    });

    // Fallback if RPC is not available
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
  } catch (error: any) {
    console.error('Generation error:', error);

    // Catch Supabase missing column error
    if (error.code === '42703' || error.message?.includes('column "plan_type"')) {
      return NextResponse.json({
        error: 'Database not set up correctly! You must run the SQL commands in Supabase to add the plan_type and tokens columns.'
      }, { status: 500 });
    }

    const message = error instanceof Error ? error.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
