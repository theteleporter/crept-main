import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface CategoryData {
  title: string;
  bannerImage: string;
  url: string;
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array: CategoryData[]): CategoryData[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const filePath = path.join(process.cwd(), `app/data/categories/${id}.json`); 
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data: CategoryData[] = JSON.parse(fileData); 
    const shuffledData = shuffleArray(data);
    return NextResponse.json(shuffledData);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return new NextResponse('Category not found', { status: 404 });
    } else {
      console.error('Error reading or parsing data:', error);
      return NextResponse.redirect(new URL('/error', request.url), { status: 500 }); // Redirect to a custom error page on server errors
    }
  }
}
