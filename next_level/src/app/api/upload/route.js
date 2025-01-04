import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAWQUOZH5VCL33PTO6",
    secretAccessKey: "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",
  },
});

async function uploadFileToS3(fileBuffer, fileName, folderName) {
  const folderPath = `${folderName}/`;
  const filePath = `${folderPath}${fileName}`;

  // Check if folder exists (optional as S3 doesn't have real folders)
  try {
    const command = new HeadObjectCommand({
      Bucket: "nextlevel-classnotes",
      Key: folderPath,
    });
    await s3Client.send(command);
  } catch (err) {
    // Create folder if it doesn't exist
    if (err.$metadata.httpStatusCode === 404) {
      const createFolderCommand = new PutObjectCommand({
        Bucket: "nextlevel-classnotes",
        Key: folderPath,
        Body: "",
      });
      await s3Client.send(createFolderCommand);
    } else {
      throw err;
    }
  }

  // Upload file
  const uploadCommand = new PutObjectCommand({
    Bucket: "nextlevel-classnotes",
    Key: filePath,
    Body: fileBuffer,
    ContentType: "application/pdf", // Assuming it's a PDF file
  });

  await s3Client.send(uploadCommand);
  return filePath;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderName = formData.get("folderName");

    if (!file || !folderName) {
      return NextResponse.json(
        { error: "Both file and folder name are required" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const filePath = await uploadFileToS3(fileBuffer, fileName, folderName);

    return NextResponse.json({ success: true, fileName: filePath });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error uploading file" });
  }
}
