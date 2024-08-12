import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface TrailerData {
  title: string;
  slug: string;
  imgSrc: string;
  altText: string;
  vidSrc: string;
  vidTitle: string;
  type: string; // 'film' or 'title'
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app/data/featured-trailers/data.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const trailers: TrailerData[] = JSON.parse(fileData);
    return NextResponse.json(trailers);
  } catch (error: any) {
    console.error('Error fetching trailers:', error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
