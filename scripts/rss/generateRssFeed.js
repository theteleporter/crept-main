require('dotenv').config();
const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

async function getPaths(directory) {
  const dirPath = path.join(__dirname, directory);
  const files = await fs.promises.readdir(dirPath);
  return files.map(file => ({
    name: path.parse(file).name,
    path: path.join(dirPath, file)
  }));
}

function transformName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function generateRssFeed() {
  const feed = new RSS({
    title: 'Crept Studio News',
    description: 'Latest Movies and TV shows on Crept Studio',
    feed_url: `https://www.crept.studio/rss.xml`,
    site_url: `https://www.crept.studio`,
    language: 'en',
    custom_namespaces: {
      media: 'http://search.yahoo.com/mrss/',
    },
  });

  const tvShowPaths = await getPaths('../../app/data/titles/tv');
  const moviePaths = await getPaths('../../app/data/titles/movie');

  const allPaths = [...tvShowPaths, ...moviePaths];

  for (const { name, path } of allPaths) {
    const fileContent = await fs.promises.readFile(path, 'utf8');
    const jsonData = JSON.parse(fileContent);

    const itemType = tvShowPaths.some(tv => tv.name === name) ? 'TV Show' : 'Movie';
    const urlType = itemType === 'TV Show' ? 'title' : 'film';

    feed.item({
      title: transformName(jsonData.title),
      description: `New ${itemType}: ${transformName(jsonData.title)}`,
      url: `https://www.crept.studio/browse/${urlType}/${name}`,
      guid: `https://www.crept.studio/browse/${urlType}/${name}`,
      date: new Date(),
      author: 'The Teleporter', // If author info is available in JSON, use jsonData.author
      categories: jsonData.genres, // If genres are available in JSON
      custom_elements: [
        { 'media:content': { _attr: { url: `https://www.crept.studio${jsonData.bannerImage}`, medium: 'image', type: 'full' } } },
        { 'media:description': jsonData.description },
        { 'media:rating': jsonData.rating },
      ]
    });
  }

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(__dirname, '../../public', 'rss.xml'), rss);

  // Submit the RSS feed to Google Search Console
  await submitSitemapToGoogle();
}

async function submitSitemapToGoogle() {
  const feedUrl = `https://www.crept.studio/rss.xml`;

  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../app/data/keys/crept-studio-feb70a36e7d1.json'), // Path to your service account key file
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchConsole = google.webmasters({
    version: 'v3',
    auth: await auth.getClient(),
  });

  const siteUrl = `sc-domain:crept.studio`; // Use the domain format for siteUrl

  try {
    await searchConsole.sitemaps.submit({
      siteUrl,
      feedpath: feedUrl,
    });
    console.log('Successfully submitted RSS feed to Google Search Console.');
  } catch (error) {
    console.error('Error submitting RSS feed to Google Search Console:', error);
  }
}

generateRssFeed().then(() => console.log('RSS feed generated and saved to public/rss.xml'));
