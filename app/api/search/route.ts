import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Item {
  title: string;
  url: string;
  trending?: string;
  genres: string[];
}

export async function GET() {
  try {
 
    const filePath = path.join(process.cwd(), 'app/data/categories/films.json');


    const fileData = await fs.readFile(filePath, 'utf-8');

   
    const data: Item[] = JSON.parse(fileData);

 
    return NextResponse.json(data); 
  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}