import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(request) {
  try {
    // Extracting the video ID from the request body
    const body = await request.json();
    const { videoId } = body;

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    // Constructing the video URL from the videoId
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Fetch transcript using the constructed URL
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);

    // Extract only the 'text' field from each transcript item
    const transcriptText = transcript.map(item => item.text).join(' ');
    console.log(transcriptText);
    return NextResponse.json({ transcript: transcriptText });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch transcript' }, { status: 500 });
  }
}