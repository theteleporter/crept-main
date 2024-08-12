import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// Function to recursively traverse directories and collect image file paths
const collectImagePaths = (dir: string, filepaths: string[] = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      collectImagePaths(filePath, filepaths); // Recursively traverse subdirectories
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(filePath)) {
      filepaths.push(filePath); // Add image file path to the list
    }
  });
  return filepaths;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mainImageDir = path.join(process.cwd(), 'public', 'assets', 'images');

  // Collect all image file paths recursively from the main image directory
  const allImagePaths = collectImagePaths(mainImageDir);

  // Process each image file path to generate Blob URLs
  const blobUrls: string[] = [];
  allImagePaths.forEach(imagePath => {
    const data = fs.readFileSync(imagePath); // Read file synchronously
    const blob = new Blob([data]); // Create Blob from file data
    const blobUrl = URL.createObjectURL(blob); // Generate Blob URL
    blobUrls.push(blobUrl);
  });

  res.status(200).json({ blobUrls });
}
