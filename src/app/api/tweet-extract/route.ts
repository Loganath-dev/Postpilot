import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || !url.trim()) {
      return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
    }

    // Validate it's a Twitter/X URL
    const tweetUrlPattern = /^https?:\/\/(twitter\.com|x\.com)\/\w+\/status\/\d+/i;
    if (!tweetUrlPattern.test(url.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid Twitter/X post URL (e.g. https://x.com/user/status/123...)' },
        { status: 400 }
      );
    }

    // Use Twitter oEmbed API to extract tweet data
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url.trim())}&omit_script=true`;

    const res = await fetch(oembedUrl, {
      headers: { 'User-Agent': 'PostPilot/1.0' },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Could not fetch tweet. The tweet may be private or deleted.' },
        { status: 404 }
      );
    }

    const data = await res.json();

    // Extract clean text from the HTML response
    // oEmbed returns HTML like: <blockquote>...<p>TWEET TEXT</p>... &mdash; Author Name (@handle)</blockquote>
    const htmlContent: string = data.html || '';

    // Extract tweet text from <p> tags
    const pMatch = htmlContent.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    let tweetText = '';
    if (pMatch) {
      tweetText = pMatch
        .map((p: string) => p.replace(/<[^>]+>/g, '').trim())
        .filter((t: string) => t.length > 0)
        .join('\n\n');
    }

    // Clean up HTML entities
    tweetText = tweetText
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/pic\.twitter\.com\/\w+/g, '')
      .trim();

    // Extract author name from oEmbed
    const authorName: string = data.author_name || 'Unknown';
    const authorHandle: string = data.author_url
      ? '@' + data.author_url.split('/').pop()
      : '@user';

    return NextResponse.json({
      success: true,
      data: {
        text: tweetText,
        authorName,
        authorHandle,
        url: url.trim(),
      },
    });
  } catch (error: unknown) {
    console.error('Tweet extraction error:', error);
    const message = error instanceof Error ? error.message : 'Extraction failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
