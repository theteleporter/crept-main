"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// Excluded genres
var excludedGenres = ["Films", "All", "", "Sci-Fi"];
// Function to combine genres, remove duplicates, and sort alphabetically
function extractAndSaveGenres(sourceFolders, outputFile) {
    var allGenres = new Set(); // Use a Set for unique values
    sourceFolders.forEach(function (sourceFolder) {
        var files = fs.readdirSync(sourceFolder);
        files.forEach(function (file) {
            try {
                var filePath = path.join(sourceFolder, file);
                var rawData = fs.readFileSync(filePath, 'utf-8');
                var tvShowData = JSON.parse(rawData);
                tvShowData.genres.forEach(function (genre) {
                    if (!excludedGenres.includes(genre)) { // Exclude specified genres
                        allGenres.add(genre);
                    }
                });
            }
            catch (error) {
                console.error("Error processing ".concat(file, ":"), error);
            }
        });
    });
    // Convert Set to Array and sort alphabetically
    var uniqueGenresArray = Array.from(allGenres).sort(function (a, b) { return a.localeCompare(b); });
    fs.writeFileSync(outputFile, JSON.stringify(uniqueGenresArray, null, 2));
    console.log("Extracted genres and saved to ".concat(outputFile));
}
// --- Main Execution ---
var sourceFolders = [
    path.join(__dirname, '../../app/data/titles/tv'),
    path.join(__dirname, '../../app/data/titles/movie')
];
var outputFile = path.join(__dirname, '../../app/data/categories/genres.json');
extractAndSaveGenres(sourceFolders, outputFile);
