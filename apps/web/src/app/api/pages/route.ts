import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "pages.json");

// Helper to get all pages
function getPagesData() {
  if (!fs.existsSync(dataFilePath)) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify({}));
  }
  const fileContents = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(fileContents || "{}");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  const db = getPagesData();

  if (pageId) {
    const pageData = db[pageId] || null;
    return NextResponse.json({ page: pageData });
  }

  // Return all pages if no pageId is specified
  return NextResponse.json({ pages: db });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageId, sections, isPublished } = body;

    if (!pageId) {
      return NextResponse.json({ error: "pageId is required" }, { status: 400 });
    }

    const db = getPagesData();
    db[pageId] = {
      sections: sections || [],
      isPublished: isPublished !== undefined ? isPublished : true,
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(dataFilePath, JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, message: "Page saved successfully" });
  } catch (error) {
    console.error("Error saving page:", error);
    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}
