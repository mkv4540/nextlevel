import axios from "axios";

const API_KEY = "AIzaSyArx_5AqPXMDEsTtow6DxMtdJoirgHB3EU"; // Replace with your YouTube API Key
const CHANNEL_ID = "UCk8OgHxULn_1gK6Nn_9rxVg"; // Replace with the YouTube Channel ID

// Function to fetch the top 5 videos from a YouTube channel
const fetchTopVideos = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          part: "snippet",
          order: "date", // You can change to "viewCount" or "rating" if needed
          maxResults: 5, // Fetch top 5 videos
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
  const RRBVideos = await fetchTopVideos();
  const NTPCVideos = await fetchTopVideos();
  const UP_PCSVideos = await fetchTopVideos();
  const BIHAR_SSC_GSVideos = await fetchTopVideos();
  const CURRENT_AFFAIRSVideos = await fetchTopVideos();

  return [
    { RRB: RRBVideos },
    { NTPC: NTPCVideos },
    { UP_PCS: UP_PCSVideos },
    { BIHAR_SSC_GS: BIHAR_SSC_GSVideos },
    { CURRENT_AFFAIRS: CURRENT_AFFAIRSVideos },
  ];
};

