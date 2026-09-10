import { BlobServiceClient } from '@azure/storage-blob';
import { randomUUID } from 'crypto';
import path from 'path';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING ?? '';
const containerName = process.env.AZURE_CONTAINER_NAME ?? 'portfolio-images';

export async function uploadToAzure(
  buffer: Buffer,
  originalName: string,
  mimetype: string,
): Promise<string> {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Garante que o container existe com acesso público (blobs)
  await containerClient.createIfNotExists({ access: 'blob' });

  const ext = path.extname(originalName) || '.jpg';
  const blobName = `${randomUUID()}${ext}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.upload(buffer, buffer.length, {
    blobHTTPHeaders: { blobContentType: mimetype },
  });

  return blockBlobClient.url;
}
