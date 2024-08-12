const fs = require('fs');
const path = require('path');

async function getAllPaths() {
  const filmPaths = await getPathsFromDirectory('../../app/data/titles/movie', '/browse/film');
  const tvShowPaths = await getPathsFromDirectory('../../app/data/titles/tv', '/browse/title');
  const categoryPaths = await getPathsFromDirectory('../../app/data/categories', '/browse/category');

  return [...filmPaths, ...tvShowPaths, ...categoryPaths];
}

async function getPathsFromDirectory(directory, prefix) {
  try {
    const dirPath = path.join(__dirname, directory);
    const files = await fs.promises.readdir(dirPath);
    return files.map(file => `${prefix}/${path.parse(file).name}`);
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

async function generatePathsFile() {
  const paths = await getAllPaths();
  const excludedPaths = ['/admin', '/api', '/offline', '/test'];
  const filteredPaths = paths.filter(p => {
    return !excludedPaths.some(excludedPath => p.startsWith(excludedPath));
  });

  fs.writeFileSync('app/data/sitemap/data.json', JSON.stringify(filteredPaths, null, 2));
}

generatePathsFile().then(() => console.log('Paths generated and written to app/data/sitemap/data.json'));
