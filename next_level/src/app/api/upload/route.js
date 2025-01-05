import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, HeadObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const BUCKETS = {
  "nextlevel-classnotes": "nextlevel-classnotes",
  "ncert-notes-nextlevel": "ncert-notes-nextlevel",
};

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAWQUOZH5VCL33PTO6",
    secretAccessKey: "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",
  },
});

async function uploadFileToS3(fileBuffer, fileName, folderName, bucketName) {
  const folderPath = `${folderName}/`;
  const filePath = `${folderPath}${fileName}`;

  // Upload file
  const uploadCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: filePath,
    Body: fileBuffer,
    ContentType: "application/pdf",
  });

  await s3Client.send(uploadCommand);
  return filePath;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderName = formData.get("folderName");
    const fileName = formData.get("fileName");
    const isExistingFolder = formData.get("isExistingFolder") === "true";
    const selectedBucket = formData.get("bucketName");

    if (!file || !folderName || !fileName || !selectedBucket) {
      return NextResponse.json(
        { error: "File, folder name, file name, and bucket name are required" },
        { status: 400 }
      );
    }

    const bucketName = BUCKETS[selectedBucket];

    if (!bucketName) {
      return NextResponse.json(
        { error: "Invalid bucket name" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const folderPath = `${folderName}/`;

    // Check if folder exists
    try {
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: folderPath,
      });
      await s3Client.send(command);

      if (!isExistingFolder) {
        return NextResponse.json(
          { error: "Folder already exists. Choose 'Existing Folder' instead." },
          { status: 400 }
        );
      }
    } catch (err) {
      if (err.$metadata.httpStatusCode === 404) {
        if (isExistingFolder) {
          return NextResponse.json(
            { error: "Folder does not exist. Choose 'New Folder' instead." },
            { status: 400 }
          );
        }

        // Create folder if it doesn't exist
        const createFolderCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: folderPath,
          Body: "",
        });
        await s3Client.send(createFolderCommand);
      } else {
        throw err;
      }
    }

    const filePath = await uploadFileToS3(fileBuffer, fileName, folderName, bucketName);
    return NextResponse.json({ success: true, fileName: filePath });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error uploading file" });
  }
}

export async function GET() {
  try {
    const bucketName = "nextlevel-classnotes"; // Default bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Delimiter: "/",
    });

    const response = await s3Client.send(listCommand);
    const folders = response.CommonPrefixes?.map((prefix) => prefix.Prefix.replace("/", "")) || [];
    return NextResponse.json({ success: true, folders });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching folders" });
  }
}
