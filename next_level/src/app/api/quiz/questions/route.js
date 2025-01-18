import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client
const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIAWQUOZH5VCL33PTO6',
    secretAccessKey: '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',
  },
});

export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { videoId, question, options, correctAnswer } = body;

    // Validate required fields
    if (!videoId || !question || !options || correctAnswer === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: videoId, question, options, or correctAnswer' },
        { status: 400 }
      );
    }

    // Validate options array
    if (!Array.isArray(options) || options.length !== 4) {
      return NextResponse.json(
        { error: 'Exactly 4 options are required' },
        { status: 400 }
      );
    }

    // Ensure all options are non-empty strings
    if (options.some((option) => typeof option !== 'string' || option.trim() === '')) {
      return NextResponse.json(
        { error: 'All options must be non-empty strings' },
        { status: 400 }
      );
    }

    // Validate correct answer index
    if (correctAnswer < 0 || correctAnswer >= options.length) {
      return NextResponse.json(
        { error: 'Invalid correct answer index. It must be between 0 and 3.' },
        { status: 400 }
      );
    }

    // Prepare the new question data
    const newQuestion = {
      text: question,
      options: [
        options[0],
        options[1],
        options[2],
        options[3]
      ],
      answer: options[correctAnswer]
    };

    // Fetch the existing file from S3
    const fileName = `${videoId}-quiz.json`;
    let existingQuizData = { questions: [] };

    try {
      const getObjectResponse = await s3.send(
        new GetObjectCommand({
          Bucket: 'quiz-nextlevelquiz', // Replace with your bucket name
          Key: fileName,
        })
      );
      const existingData = await getObjectResponse.Body.transformToString();
      existingQuizData = JSON.parse(existingData);
    } catch (error) {
      if (error.name !== 'NoSuchKey') {
        throw error; // Re-throw if the error is not "file not found"
      }
      // If the file doesn't exist, existingQuizData remains { questions: [] }

    }

    // Append the new question to the existing data
    const updatedQuizData = {
      questions: [...existingQuizData.questions, newQuestion],
    };

    // Upload the updated file back to S3
    const params = {
      Bucket: 'quiz-nextlevelquiz', // Replace with your bucket name
      Key: fileName,
      Body: JSON.stringify(updatedQuizData),
      ContentType: 'application/json',
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Return success response
    return NextResponse.json(
      { message: 'Question added successfully', question: newQuestion },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding question:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}