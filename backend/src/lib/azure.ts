import { BlobServiceClient, RestError } from "@azure/storage-blob";
import { randomUUID } from "crypto";
import path from "path";

function getConfig() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING ?? "";
  const containerName = process.env.AZURE_CONTAINER_NAME ?? "portfolio-images";
  if (!connectionString) {
    throw new Error(
      "AZURE_STORAGE_CONNECTION_STRING não configurada no backend.",
    );
  }
  const hasAccountKey =
    connectionString.includes("AccountName=") &&
    connectionString.includes("AccountKey=");
  const hasSas =
    connectionString.includes("BlobEndpoint=") &&
    connectionString.includes("SharedAccessSignature=");
  if (!hasAccountKey && !hasSas) {
    throw new Error(
      'Connection string do Azure incompleta. Copie a "Connection string" inteira em Access keys (key1): DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net',
    );
  }
  return { connectionString, containerName };
}

export function friendlyAzureError(err: unknown): {
  status: number;
  message: string;
} {
  const msg = (err as { code?: string; message?: string }) ?? {};
  if (
    msg.code === "ERR_INVALID_URL" ||
    /invalid url/i.test(msg.message ?? "")
  ) {
    return {
      status: 500,
      message:
        'Connection string do Azure inválida. Copie a "Connection string" completa em Access keys (key1), sem quebras de linha.',
    };
  }
  if (err instanceof Error && !isRestError(err)) {
    return { status: 500, message: err.message };
  }
  const code = (err as { code?: string })?.code ?? "";
  const statusCode = (err as { statusCode?: number })?.statusCode ?? 502;
  switch (code) {
    case "PublicAccessNotPermitted":
      return {
        status: 502,
        message:
          'Conta Azure bloqueia acesso público a blobs. Em Configuration, ative "Allow Blob public access".',
      };
    case "AuthorizationFailure":
      return {
        status: 502,
        message:
          "Azure negou acesso. Confira a connection string (Access keys → Connection string) e o nome do container.",
      };
    case "ContainerNotFound":
      return {
        status: 502,
        message:
          "Container não encontrado e a chave não tem permissão para criá-lo. Crie o container no portal.",
      };
    default:
      return {
        status: statusCode >= 400 && statusCode < 600 ? statusCode : 502,
        message: `Falha no upload para o Azure (${code || "erro de rede"}). Veja os logs do backend.`,
      };
  }
}

function isRestError(err: unknown): boolean {
  return err instanceof RestError;
}

export async function uploadToAzure(
  buffer: Buffer,
  originalName: string,
  mimetype: string,
): Promise<string> {
  const { connectionString, containerName } = getConfig();
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Só tenta criar se não existir — nunca altera o acesso de um container
  // já criado (evita PublicAccessNotPermitted em contas restritas).
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create({ access: "blob" });
  }

  const ext = path.extname(originalName) || ".jpg";
  const blobName = `${randomUUID()}${ext}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.upload(buffer, buffer.length, {
    blobHTTPHeaders: { blobContentType: mimetype },
  });

  return blockBlobClient.url;
}
