require('dotenv').config();
const { google } = require('googleapis');
const path = require('path');

async function submitSitemapToGoogle() {
  const appUrl = "https://www.crept.studio";
  
  if (!appUrl) {
    console.error('Error: NEXT_PUBLIC_APP_URL is not defined.');
    return;
  }

  const feedUrl = `${appUrl}/sitemap.xml`;

  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../app/data/keys/crept-studio-feb70a36e7d1.json'),
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchConsole = google.webmasters({
    version: 'v3',
    auth: await auth.getClient(),
  });

  const siteUrl = `sc-domain:${appUrl.replace(/^https?:\/\//, '')}`;

  try {
    await searchConsole.sitemaps.submit({
      siteUrl,
      feedpath: feedUrl,
    });
    console.log('Successfully submitted sitemap to Google Search Console.');
  } catch (error) {
    console.error('Error submitting sitemap to Google Search Console:', error);
  }
}

submitSitemapToGoogle().then(() => console.log('Sitemap submission script finished.'));
