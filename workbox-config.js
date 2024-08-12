module.exports = {
	globDirectory: 'public/',
	clientsClaim: true,
	skipWaiting: true,
	globPatterns: [
		'**/*.{ttf,txt,png,svg,jpg,webp,xml,json,js,ts,webmanifest,ico}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	runtimeCaching: [
		{
		  urlPattern: /^https:\/\/www\.crept\.studio\/api\//,
		  handler: "StaleWhileRevalidate",
		  options: {
			cacheName: "api-cache",
			expiration: {
			  maxEntries: 200,
			  maxAgeSeconds: 24 * 60 * 60, // 1 Day
			},
			cacheableResponse: {
			  statuses: [0, 200],
			},
		  },
		},
	  ],
};