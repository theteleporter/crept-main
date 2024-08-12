import { NextRequest, NextResponse } from 'next/server';

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://the-habinger-of-peace.vercel.app', // Replace with your production URL
];

export async function GET(request: NextRequest) {

  const origin = request.headers.get('origin');
  

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin || '') || !origin) {
    const jsonDirectory = process.cwd() + 'app/data'; // Get path to json dir
    const fileContents = await fetch(`${request.nextUrl.origin}/app/data/movies.json`); // Fetch the JSON data
    const movies = await fileContents.json();

    const response = NextResponse.json(movies);
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  // If origin is not allowed, return a 403 Forbidden response
  return new NextResponse(null, {
    status: 403,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}


// Handle OPTIONS requests for preflight checks
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 }); // No content
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins for OPTIONS
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}
