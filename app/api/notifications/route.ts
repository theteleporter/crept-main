import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Notification {
  title: string;
  description: string;
  url: string;
  imgUrl: string;
  imgTitle: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "app/data/notifications/data.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const data: Notification[] = JSON.parse(fileData);

    return NextResponse.json(data); // Return the notifications data directly
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return new NextResponse('Notifications data not found', { status: 404 });
    } else {
      console.error('Error reading or parsing notifications data:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}