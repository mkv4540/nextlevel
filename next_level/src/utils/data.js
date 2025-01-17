import axios from "axios";


const API_KEY = "AIzaSyA8ogCn2FYcjTsM4qxVriuhQelBnz9YoE0"; // Replace with your YouTube API Key
const CHANNEL_ID = "UCk8OgHxULn_1gK6Nn_9rxVg"; // Replace with the YouTube Channel ID

// Function to fetch the top 5 latest videos from a YouTube channel
const fetchTopVideos = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          part: "snippet",
          order: "date", // Ensure videos are ordered by date
          maxResults: 5, // Fetch top 5 latest videos
          type: 'video' // Ensure only videos are fetched
        },
      }
    );

    // Map the API response to the desired format
    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      ytURl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};

// Example usage for the updated data
export const dataAccordingToBtnSelected = async () => {
  const videos = await fetchTopVideos(); // Fetch videos once and use for all categories

  return [
    { RRB: videos },
    { NTPC: videos },
    { UP_PCS: videos },
    { BIHAR_SSC_GS: videos },
    { CURRENT_AFFAIRS: videos },
  ];
};




