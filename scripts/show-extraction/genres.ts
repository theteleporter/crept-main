import * as fs from 'fs';
import * as path from 'path';

interface TvShow {
  title: string;
  url: string;
  description: string;
  release_year: string;
  seasons: number;
  bannerImage: string;
  genres: string[];
  rating: string;
  trending?: string;
}

// Excluded genres
const excludedGenres = ["Films", "All", "", "Sci-Fi"];

// Function to combine genres, remove duplicates, and sort alphabetically
function extractAndSaveGenres(sourceFolders: string[], outputFile: string) {
  const allGenres = new Set<string>(); // Use a Set for unique values

  sourceFolders.forEach((sourceFolder) => {
    const files = fs.readdirSync(sourceFolder);
    files.forEach((file) => {
      try {
        const filePath = path.join(sourceFolder, file);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const tvShowData: TvShow = JSON.parse(rawData);
        tvShowData.genres.forEach((genre) => {
          if (!excludedGenres.includes(genre)) { // Exclude specified genres
            allGenres.add(genre);
          }
        });
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    });
  });

  // Convert Set to Array and sort alphabetically
  const uniqueGenresArray = Array.from(allGenres).sort((a, b) => a.localeCompare(b)); 
  
  fs.writeFileSync(outputFile, JSON.stringify(uniqueGenresArray, null, 2));
  console.log(`Extracted genres and saved to ${outputFile}`);
}

// --- Main Execution ---
const sourceFolders = [
  path.join(__dirname, '../../app/data/titles/tv'),
  path.join(__dirname, '../../app/data/titles/movie')
];

const outputFile = path.join(__dirname, '../../app/data/categories/genres.json');
extractAndSaveGenres(sourceFolders, outputFile);
