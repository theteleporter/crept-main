import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const filePath = path.join(process.cwd(), `app/data/titles/movie/${id}.json`);
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data: MovieData = JSON.parse(fileData);
    return NextResponse.json(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return new NextResponse('Movie not found', { status: 404 });
    } else {
      console.error('Error reading or parsing data:', error);
      return NextResponse.redirect(new URL('/error', request.url), { status: 500 });
    }
  }
}



interface MovieData {
  // ... (interface for movie data)
}