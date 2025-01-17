
// 'use client';

// import { useState } from 'react';
// import AWS from 'aws-sdk';

// // Configure AWS SDK
// AWS.config.update({
//   region: 'ap-south-1', // Replace with your AWS region
//   credentials: new AWS.Credentials({
//     accessKeyId: 'AKIAWQUOZH5VCL33PTO6', // Replace with your AWS access key
//     secretAccessKey: '6EK+nA685dgPBlDJjLua0ZRyUL7zX2JrV7YFRSvU', // Replace with your AWS secret key
//   }),
// });

// const s3 = new AWS.S3();

// export default function QuizAdmin() {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [message, setMessage] = useState('');
//   const [transcript, setTranscript] = useState('');
//   const [quizData, setQuizData] = useState(null);

//   const handleGenerateTranscript = async () => {
//     try {
//       setMessage('');
//       setQuizData(null); // Clear previous quiz data

//       const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
//       if (!videoIdMatch || !videoIdMatch[1]) {
//         setMessage('Invalid YouTube URL. Please provide a valid link.');
//         return;
//       }

//       const videoId = videoIdMatch[1];

//       const response = await fetch('/api/transcript', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ videoId }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTranscript(data.transcript);
//         setMessage('Transcript generated successfully!');
//       } else {
//         setMessage(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error('Error generating transcript:', error);
//       setMessage('An unexpected error occurred.');
//     }
//   };

//   const handleGenerateQuiz = async () => {
//     try {
//       setMessage('');

//       if (!transcript) {
//         setMessage('Please generate the transcript first.');
//         return;
//       }

//       const response = await fetch('/api/generate-quiz', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ transcript }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setQuizData(data);
//         setMessage('Quiz generated successfully!');
//         setTranscript('');
//       } else {
//         setMessage(`Error: ${data.error}`);
//         setTranscript('');
//       }
//     } catch (error) {
//       console.error('Error generating quiz:', error);
//       setMessage('An unexpected error occurred while generating the quiz.');
//       setTranscript('');
//     }
//   };

//   const handleUploadToS3 = async () => {
//     try {
//       setMessage('');

//       if (!quizData) {
//         setMessage('Please generate the quiz first.');
//         return;
//       }

//       const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
//       const videoId = videoIdMatch ? videoIdMatch[1] : 'quiz';
//       const fileName = `${videoId}-quiz.json`;

//       const params = {
//         Bucket: 'quiz-nextlevelquiz', // Replace with your S3 bucket name
//         Key: fileName,
//         Body: JSON.stringify(quizData),
//         ContentType: 'application/json',
//       };

//       // Await the upload process
//       const uploadResponse = await s3.upload(params).promise();
//       setMessage(`Quiz uploaded successfully as ${fileName} in the S3 bucket!`);
//       console.log('S3 Upload Response:', uploadResponse);
//     } catch (error) {
//       console.error('Error uploading to S3:', error);
//       setMessage('An error occurred while uploading the quiz to S3. Check console logs for details.');
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
//       <input
//         type="text"
//         className="w-full p-2 border rounded mb-4"
//         placeholder="Paste YouTube video URL here"
//         value={videoUrl}
//         onChange={(e) => setVideoUrl(e.target.value)}
//       />
//       <button
//         onClick={handleGenerateTranscript}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Generate Transcript
//       </button>
//       <button
//         onClick={handleGenerateQuiz}
//         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4"
//       >
//         Generate Quiz
//       </button>
//       <button
//         onClick={handleUploadToS3}
//         className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mt-5"
//       >
//         Upload to S3 Bucket
//       </button>
//       {message && <p className="mt-4 text-lg">{message}</p>}
//       {transcript && (
//         <div className="mt-4 p-4 bg-gray-100 rounded">
//           <h2 className="text-xl font-bold mb-2">Transcript:</h2>
//           <p>{transcript}</p>
//         </div>
//       )}
//       {quizData && (
//         <div className="mt-4 p-4 bg-gray-100 rounded">
//           <h2 className="text-xl font-bold mb-2">Quiz Data:</h2>
//           <pre className="whitespace-pre-wrap overflow-x-auto">
//             {JSON.stringify(quizData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }


// Ensure you install AWS SDK if you haven't already
// npm install aws-sdk

'use client';

import { useState } from 'react';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIAWQUOZH5VCL33PTO6',
    secretAccessKey: '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',
  },
});

export default function QuizAdmin() {
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');
  const [transcript, setTranscript] = useState('');
  const [quizData, setQuizData] = useState(null);

  const handleGenerateTranscript = async () => {
    try {
      setMessage('');
      setQuizData(null);

      const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      if (!videoIdMatch || !videoIdMatch[1]) {
        setMessage('Invalid YouTube URL. Please provide a valid link.');
        return;
      }

      const videoId = videoIdMatch[1];

      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });

      if (!response.ok) throw new Error('Failed to fetch transcript.');

      const data = await response.json();
      setTranscript(data.transcript);
      setMessage('Transcript generated successfully!');
    } catch (error) {
      console.error('Error generating transcript:', error);
      setMessage('An unexpected error occurred while generating the transcript.');
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      setMessage('');

      if (!transcript) {
        setMessage('Please generate the transcript first.');
        return;
      }

      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) throw new Error('Failed to generate quiz.');

      const data = await response.json();
      setQuizData(data);
      setMessage('Quiz generated successfully!');
      setTranscript('');
    } catch (error) {
      console.error('Error generating quiz:', error);
      setMessage('An unexpected error occurred while generating the quiz.');
      setTranscript('');
    }
  };
  
  
  const handleUploadToS3 = async () => {
    try {
      setMessage('');
  
      if (!quizData) {
        setMessage('Please generate the quiz first.');
        return;
      }
  
      // Convert quizData to a string and then to a buffer
      const fileBuffer = Buffer.from(JSON.stringify(quizData));
  
      // Extract videoId from the URL
      const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : 'quiz';
      const fileName = `${videoId}-quiz.json`;
  
      // Set parameters for the S3 upload
      const params = {
        Bucket: 'quiz-nextlevelquiz',
        Key: fileName,
        Body: fileBuffer,
        ContentType: 'application/json',
      };
  
      const command = new PutObjectCommand(params);
      await s3.send(command);
  
      setMessage(`Quiz uploaded successfully as ${fileName} in the S3 bucket!`);
    } catch (error) {
      console.error('Error uploading to S3:', error);
      setMessage('An error occurred while uploading the quiz to S3. Check console logs for details.');
    }
  };
  

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Paste YouTube video URL here"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button
        onClick={handleGenerateTranscript}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Transcript
      </button>
      <button
        onClick={handleGenerateQuiz}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4"
      >
        Generate Quiz
      </button>
      <button
        onClick={handleUploadToS3}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mt-5"
      >
        Upload to S3 Bucket
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
      {transcript && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Transcript:</h2>
          <p>{transcript}</p>
        </div>
      )}
      {quizData && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Quiz Data:</h2>
          <pre className="whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(quizData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
