
// import { OpenAI } from 'openai';

// const openai = new OpenAI({
//   apiKey: "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", // Use environment variable for security
// });

// export async function POST(request) {
//   try {
//     // Parse the request body
//     const body = await request.json();
//     const { transcript } = body;

//     if (!transcript) {
//       return new Response(
//         JSON.stringify({ error: 'Transcript is required' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Split transcript into chunks of 1500 words
//     const words = transcript.split(/\s+/);
//     const chunks = [];
//     const chunkSize = 1500;

//     for (let i = 0; i < words.length; i += chunkSize) {
//       chunks.push(words.slice(i, i + chunkSize).join(' '));
//     }

//     const allQuestions = [];
//     const allOptions = [];
//     const allAnswers = []; // To store correct answers

//     // Process each chunk and generate quiz questions
//     for (const chunk of chunks) {
//       console.log('Processing chunk:', chunk.slice(0, 100)); // Log first 100 characters of the chunk for debugging
//       const response = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a helpful assistant skilled in creating quizzes.',
//           },
//           {
//             role: 'user',
//             content: `Generate 3 multiple-choice quiz questions in Hindi language based on this reference transcript.Do not directly copy questions, but take conceptual references. For each question, provide four options and indicate the correct answer clearly. Format your response as follows: 
//           Q: <Question>
//           Options: 
//           1. Option 1
//           2. Option 2
//           3. Option 3
//           4. Option 4
//           Answer: <Correct Option (e.g., 1, 2, 3, or 4)>
//           also the questions you generate should be quiet tough 
//           The transcript is: ${chunk}`,
//           },
//         ],
//       });

//       if (!response || !response.choices || response.choices.length === 0) {
//         console.error('Invalid API response:', response);
//         throw new Error('No valid response from OpenAI API');
//       }

//       const result = response.choices[0]?.message?.content.trim();
//       console.log('API Response:', result); // Log the raw API response

//       if (!result) {
//         throw new Error('Empty content in OpenAI API response');
//       }

//       // Parse the result to extract questions, options, and answers
//       const parsedResult = parseQuizResponse(result);
//       allQuestions.push(...parsedResult.questions);
//       allOptions.push(...parsedResult.options);
//       allAnswers.push(...parsedResult.answers);
//     }

//     // Return combined quiz questions, options, and answers
//     return new Response(
//       JSON.stringify({
//         questions: allQuestions,
//         options: allOptions,
//         answers: allAnswers,
//       }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('Error generating quiz:', error.message, error.stack);
//     return new Response(
//       JSON.stringify({ error: error.message || 'Failed to generate quiz' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }

// /**
//  * Parses the quiz response from OpenAI API into questions, options, and answers.
//  * @param {string} response - The response string from OpenAI API.
//  * @returns {object} An object containing questions, options, and answers arrays.
//  */
// function parseQuizResponse(response) {
//   const questions = [];
//   const options = [];
//   const answers = [];

//   const lines = response.split('\n');
//   let currentQuestion = null;
//   let currentOptions = [];

//   for (const line of lines) {
//     if (line.startsWith('Q:')) {
//       if (currentQuestion && currentOptions.length === 4) {
//         questions.push(currentQuestion);
//         options.push(currentOptions);
//       }
//       currentQuestion = line.substring(2).trim();
//       currentOptions = [];
//     } else if (line.startsWith('Options:')) {
//       // Do nothing, it's just a header line
//     } else if (/^\d\.\s/.test(line)) {
//       currentOptions.push(line.substring(3).trim());
//     } else if (line.startsWith('Answer:')) {
//       const answerIndex = parseInt(line.substring(7).trim(), 10);
//       if (answerIndex && currentOptions[answerIndex - 1]) {
//         answers.push(currentOptions[answerIndex - 1]);
//       }
//     }
//   }

//   // Push the last question if it exists
//   if (currentQuestion && currentOptions.length === 4) {
//     questions.push(currentQuestion);
//     options.push(currentOptions);
//   }

//   return { questions, options, answers };
// }


import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for security
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { transcript } = body;

    if (!transcript) {
      return new Response(
        JSON.stringify({ error: 'Transcript is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const words = transcript.split(/\s+/);
    const chunks = [];
    const chunkSize = 1500;

    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }

    const allQuestions = [];

    for (const chunk of chunks) {
      console.log('Processing chunk:', chunk.slice(0, 100));
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant skilled in creating quizzes.',
          },
          {
            role: 'user',
            content: `Generate 3 multiple-choice quiz questions in Hindi language based on this reference transcript.Do not directly copy questions, but take conceptual references. For each question, provide four options and indicate the correct answer clearly. Format your response as follows: :
          {
            "questions": [
              {
                "text": "<Question>",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": "<Correct Option>"
              }
            ]
          }
          Transcript: ${chunk}`,
          },
        ],
      });

      if (!response || !response.choices || !response.choices[0]?.message?.content) {
        console.error('Invalid API response:', response);
        throw new Error('Failed to generate quiz questions.');
      }

      const generatedQuestions = JSON.parse(response.choices[0].message.content).questions;

      if (!generatedQuestions || !Array.isArray(generatedQuestions)) {
        throw new Error('Invalid format in API response.');
      }

      allQuestions.push(...generatedQuestions);
    }

    return new Response(
      JSON.stringify({ questions: allQuestions }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating quiz:', error.message);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate quiz' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
