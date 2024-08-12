import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface CategoryData {
    title: string;
    bannerImage: string;
    url: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        const filePath = path.join(process.cwd(), `app/data/categories/${id}.json`);
        const fileData = await fs.readFile(filePath, 'utf-8');
        const data: CategoryData[] = JSON.parse(fileData);

        // Do not shuffle data here!
        return NextResponse.json(data); 
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            return new NextResponse('Category not found', { status: 404 });
        } else {
            console.error('Error reading or parsing data:', error);
            return NextResponse.redirect(new URL('/error', request.url), { status: 500 }); 
        }
    }
}
