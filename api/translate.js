// api/translate.js
// Vercel serverless function — mirrors the AWS Lambda translation step
// from the original project, but uses a free public translation API
// instead of AWS Translate, so it can run on Vercel's free tier.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  try {
    const { text, targetLang } = req.body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ error: 'Missing or empty "text" field.' });
      return;
    }
    if (!targetLang || typeof targetLang !== 'string') {
      res.status(400).json({ error: 'Missing "targetLang" field (e.g. "es", "fr", "de").' });
      return;
    }

    // Free tier of this API caps requests around 500 chars of text.
    const trimmedText = text.slice(0, 500);

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      trimmedText
    )}&langpair=en|${encodeURIComponent(targetLang)}`;

    const apiRes = await fetch(url);
    if (!apiRes.ok) {
      res.status(502).json({ error: 'Translation provider error.' });
      return;
    }

    const data = await apiRes.json();
    const translatedText = data?.responseData?.translatedText;

    if (!translatedText) {
      res.status(502).json({ error: 'No translation returned.' });
      return;
    }

    res.status(200).json({
      originalText: trimmedText,
      translatedText,
      targetLang,
      truncated: text.length > 500,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
}
