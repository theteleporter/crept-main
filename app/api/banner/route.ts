import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface BannerData {
  bannerImage: string;
  title: string;
  url: string;
  rating: string;
  description: string;
  release_year: number,
  seasons: number,
  genres: string[],
}

export async function GET() {
  try {
    // Construct the path to banners JSON file
    const filePath = path.join(process.cwd(), "app/data/categories/all.json");

    // Read the file contents
    const fileData = await fs.readFile(filePath, "utf-8");

    // Parse the JSON data
    const banners: BannerData[] = JSON.parse(fileData);

    // Get a random banner
    const randomIndex = Math.floor(Math.random() * banners.length);
    const banner = banners[randomIndex];

    return NextResponse.json(banner);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // Handle the case where the file is not found (404 error)
      return new NextResponse("Banners file not found: Refresh the page to fetch again.", { status: 404 });
    } else {
      // Handle other errors (e.g., JSON parsing errors)
      console.error("Error reading or parsing banner data:", error);
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
}
