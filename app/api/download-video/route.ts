import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } from '@azure/storage-blob';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
const blobUrl = searchParams.get('blobUrl'); // Get blob URL directly
const filename = searchParams.get('filename');

if (!blobUrl || !filename) {
return NextResponse.json({ error: 'Invalid blobUrl or filename' }, { status: 400 });
}
  const accountName = process.env.STORAGE_ACCOUNT_NAME;
  const accountKey = process.env.STORAGE_ACCOUNT_KEY;

  if (!accountName || !accountKey) {
    return NextResponse.json({ error: 'Azure Storage credentials not configured' }, { status: 500 });
  }

  try {
    // Extract container name and blob name from blob URL
    const urlParts = new URL(blobUrl);
    const pathParts = urlParts.pathname.split('/');
    const containerName = pathParts[1];
    const blobName = pathParts.slice(2).join('/');

    // Create a BlobServiceClient (i.e, more efficient than StorageSharedKeyCredential)
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new StorageSharedKeyCredential(accountName, accountKey)
    );

const sasOptions = {
containerName,
blobName,
permissions: BlobSASPermissions.parse("r"), // Read permission
startsOn: new Date(),
expiresOn: new Date(Date.now() + 3600 * 1000), // 1 hour expiry
};

const sasToken = generateBlobSASQueryParameters(sasOptions, blobServiceClient.credential as StorageSharedKeyCredential).toString();

    const downloadUrl = `${blobUrl}?${sasToken}`;

    return NextResponse.json({ url: downloadUrl });
  } catch (error) {
    console.error("Error generating SAS token or redirecting:", error);
    return NextResponse.json({ error: 'An error occurred while downloading the video' }, { status: 500 });
  }
}