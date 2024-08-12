import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app/data/categories/genres.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const genres = JSON.parse(fileData);
    return NextResponse.json(genres);
  } catch (error: any) {
    console.error('Error fetching genres:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
