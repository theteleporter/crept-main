var fs = require('fs');
var path = require('path');
var extractAndSaveTvShowsByGenre = function (sourceFolders, outputFolder) {
    var tvShowsByGenre = {}; // Allow different object types for "Films"
    var includedFilmGenres = ["movie", "tv show"]; // Only these are extracted for "films"
    sourceFolders.forEach(function (sourceFolder) {
        var files = fs.readdirSync(sourceFolder);
        files.forEach(function (file) {
            try {
                var filePath = path.join(sourceFolder, file);
                var rawData = fs.readFileSync(filePath, 'utf-8');
                var tvShowData_1 = JSON.parse(rawData);
                tvShowData_1.genres.forEach(function (genre) {
                    var lowerCaseGenre = genre.toLowerCase();
                    if (lowerCaseGenre === "films") {
                        // Filter only "Movie" and "TV Show" for "films"
                        var filteredGenres = tvShowData_1.genres.filter(function (g) { return includedFilmGenres.includes(g.toLowerCase()); });
                        tvShowsByGenre["films"] = tvShowsByGenre["films"] || [];
                        tvShowsByGenre["films"].push({
                            title: tvShowData_1.title,
                            url: tvShowData_1.url,
                            trending: tvShowData_1.trending,
                            genres: filteredGenres // Include only filtered genres
                        });
                    }
                    else if (genre.toLowerCase() === "all") {
                        // Custom extraction for "all"
                        tvShowsByGenre["all"] = tvShowsByGenre["all"] || [];
                        tvShowsByGenre["all"].push({
                            title: tvShowData_1.title,
                            url: tvShowData_1.url,
                            description: tvShowData_1.description,
                            release_year: tvShowData_1.release_year,
                            seasons: tvShowData_1.seasons,
                            bannerImage: tvShowData_1.bannerImage,
                            rating: tvShowData_1.rating,
                            trending: tvShowData_1.trending,
                            genres: [tvShowData_1.genres[0], tvShowData_1.genres[1]],
                        });
                    }
                    else {
                        // Normal extraction for other genres
                        tvShowsByGenre[genre] = tvShowsByGenre[genre] || [];
                        tvShowsByGenre[genre].push({
                            title: tvShowData_1.title,
                            url: tvShowData_1.url,
                            description: tvShowData_1.description,
                            release_year: tvShowData_1.release_year,
                            seasons: tvShowData_1.seasons,
                            bannerImage: tvShowData_1.bannerImage,
                            rating: tvShowData_1.rating,
                        });
                    }
                });
            }
            catch (error) {
                console.error("Error processing ".concat(file, ":"), error);
            }
        });
    });
    // Save TV shows by genre
    for (var genre in tvShowsByGenre) {
        var lowerCaseGenre = genre.toLowerCase();
        var filePath = path.join(outputFolder, "".concat(lowerCaseGenre, ".json"));
        fs.writeFileSync(filePath, JSON.stringify(tvShowsByGenre[genre], null, 2));
        console.log("Extracted data for \"".concat(genre, "\" to ").concat(filePath));
    }
};
// --- Main Execution ---
var sourceFolders = [
    path.join(__dirname, '../../app/data/titles/tv'),
    path.join(__dirname, '../../app/data/titles/movie')
];
var outputFolder = path.join(__dirname, '../../app/data/categories');
extractAndSaveTvShowsByGenre(sourceFolders, outputFolder);
