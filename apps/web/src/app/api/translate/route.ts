import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { texts, targetLang = "ml" } = await request.json();

    if (!texts || !Array.isArray(texts)) {
      return NextResponse.json({ error: "texts array is required" }, { status: 400 });
    }

    const translatedTexts = [];
    for (const text of texts) {
        if (!text || text.trim() === "") {
            translatedTexts.push("");
            continue;
        }
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
            const res = await fetch(url);
            const data = await res.json();
            let translated = "";
            if (data && data[0]) {
                data[0].forEach((t: any) => {
                    if (t[0]) translated += t[0];
                });
            }
            translatedTexts.push(translated || text);
            // wait 300ms to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (e) {
            console.error("Translation failed for", text, e);
            translatedTexts.push("");
        }
    }

    return NextResponse.json({ translated: translatedTexts });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json({ error: "Failed to translate" }, { status: 500 });
  }
}
