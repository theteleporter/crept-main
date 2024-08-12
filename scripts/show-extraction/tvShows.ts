const fs = require('fs');
const path = require('path');

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

type SourceFolder = string;

const extractAndSaveTvShowsByGenre = (sourceFolders: SourceFolder[], outputFolder: string) => {
    const tvShowsByGenre: Record<string, any[]> = {}; // Allow different object types for "Films"

    const includedFilmGenres = ["movie", "tv show"]; // Only these are extracted for "films"

    sourceFolders.forEach(sourceFolder => {
        const files = fs.readdirSync(sourceFolder);
        files.forEach((file: any) => {
            try {
                const filePath = path.join(sourceFolder, file);
                const rawData = fs.readFileSync(filePath, 'utf-8');
                const tvShowData: TvShow = JSON.parse(rawData);

                tvShowData.genres.forEach(genre => {
                    const lowerCaseGenre = genre.toLowerCase();

                    if (lowerCaseGenre === "films") {
                        // Filter only "Movie" and "TV Show" for "films"
                        const filteredGenres = tvShowData.genres.filter(g => includedFilmGenres.includes(g.toLowerCase()));

                        tvShowsByGenre["films"] = tvShowsByGenre["films"] || [];
                        tvShowsByGenre["films"].push({
                            title: tvShowData.title,
                            url: tvShowData.url,
                            trending: tvShowData.trending,
                            genres: filteredGenres // Include only filtered genres
                        });

                    } else if (genre.toLowerCase() === "all") {
                            // Custom extraction for "all"
                            tvShowsByGenre["all"] = tvShowsByGenre["all"] || [];
                            tvShowsByGenre["all"].push({
                                title: tvShowData.title,
                                url: tvShowData.url,
                                description: tvShowData.description,
                                release_year: tvShowData.release_year,
                                seasons: tvShowData.seasons,
                                bannerImage: tvShowData.bannerImage,
                                rating: tvShowData.rating,
                                trending: tvShowData.trending,
                                genres: [tvShowData.genres[0], tvShowData.genres[1]],
                            });
                    } else {
                        // Normal extraction for other genres
                        tvShowsByGenre[genre] = tvShowsByGenre[genre] || [];
                        tvShowsByGenre[genre].push({
                            title: tvShowData.title,
                            url: tvShowData.url,
                            description: tvShowData.description,
                            release_year: tvShowData.release_year,
                            seasons: tvShowData.seasons,
                            bannerImage: tvShowData.bannerImage,
                            rating: tvShowData.rating,
                        });
                    } 
                });
            } catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        });
    });

    // Save TV shows by genre
    for (const genre in tvShowsByGenre) {
        const lowerCaseGenre = genre.toLowerCase();
        const filePath = path.join(outputFolder, `${lowerCaseGenre}.json`);
        fs.writeFileSync(filePath, JSON.stringify(tvShowsByGenre[genre], null, 2));
        console.log(`Extracted data for "${genre}" to ${filePath}`); 
    }
};

// --- Main Execution ---
const sourceFolders = [
    path.join(__dirname, '../../app/data/titles/tv'),
    path.join(__dirname, '../../app/data/titles/movie')
];

const outputFolder = path.join(__dirname, '../../app/data/categories');
extractAndSaveTvShowsByGenre(sourceFolders, outputFolder);