import axios from "axios";

const API_KEY = "AIzaSyA8ogCn2FYcjTsM4qxVriuhQelBnz9YoE0"; // Replace with your YouTube API Key
const CHANNEL_ID = "UCk8OgHxULn_1gK6Nn_9rxVg"; // Replace with the YouTube Channel ID

// Function to fetch the top 5 videos from a YouTube channel
const fetchTopVideos = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
<<<<<<< Updated upstream
        title: "Video From Youtube RRB",
        ytURl: "https://www.youtube.com/watch?v=GB2kRJlR9v4",
      },
      {
        title: "Video From Youtube RRB",
        ytURl: "https://www.youtube.com/watch?v=a-UPuJJHPbA",
      },
      {
        title: "Video From Youtube RRB",
        ytURl: "https://www.youtube.com/watch?v=G8OdUFfoSe0",
      },
      {
        title: "Video From Youtube RRB",
        ytURl: "https://www.youtube.com/watch?v=KYW2t3yFf18",
      },
      {
        title: "Video From Youtube RRB",
        ytURl: "https://www.youtube.com/watch?v=17CJqk1Lw1I",
      },
      {
        title: "Video From Youtube RRB",
        ytURl: "https://www.youtube.com/watch?v=2oIrVjf0LbA",
      },
    ],
  },
  {
    NTPC: [
      {
        title: "Video From Youtube NTPC",
        ytURl: "https://www.youtube.com/watch?v=qb6zkDSL6gU",
      },
      {
        title: "Video From Youtube NTPC",
        ytURl: "https://www.youtube.com/watch?v=eNYi6jqG6e4",
      },
      {
        title: "Video From Youtube NTPC",
        ytURl: "https://www.youtube.com/watch?v=Q0X-wNMR0dQ",
      },
      {
        title: "Video From Youtube NTPC",
        ytURl: "https://www.youtube.com/watch?v=8PBXuF6p9uE",
      },
      {
        title: "Video From Youtube NTPC",
        ytURl: "https://www.youtube.com/watch?v=a9vZqURXj_g",
      },
      {
        title: "Video From Youtube NTPC",
        ytURl: "https://www.youtube.com/watch?v=BjProjejky0",
      },
    ],
  },
  {
    UP_PCS: [
      {
        title: "Video From Youtube UP_PCS",
        ytURl: "https://www.youtube.com/watch?v=QQK_o08wcgo",
      },
      {
        title: "Video From Youtube UP_PCS",
        ytURl: "https://www.youtube.com/watch?v=QH8JnS4TxBE",
      },
      {
        title: "Video From Youtube UP_PCS",
        ytURl: "https://www.youtube.com/watch?v=BwdBK23fKp8",
      },
      {
        title: "Video From Youtube UP_PCS",
        ytURl: "https://www.youtube.com/watch?v=03l2fY-QQbk",
      },
    ],
  },
  {
    BIHAR_SSC_GS: [
      {
        title: "Video From Youtube BIHAR_SSC_GS",
        ytURl: "https://www.youtube.com/watch?v=VhHRhKPTRwo",
      },
      {
        title: "Video From Youtube BIHAR_SSC_GS",
        ytURl: "https://www.youtube.com/watch?v=RTVhKb1DJgM",
      },
      {
        title: "Video From Youtube BIHAR_SSC_GS",
        ytURl: "https://www.youtube.com/watch?v=uLiFbG0Lr0Q",
      },
    ],
  },
  {
    CURRENT_AFFAIRS: [
      {
        title: "Video From Youtube CURRENT_AFFAIRS",
        ytURl: "https://www.youtube.com/watch?v=50XZ3eAqQ2I",
      },
      {
        title: "Video From Youtube CURRENT_AFFAIRS",
        ytURl: "https://www.youtube.com/watch?v=9CHHuzwm5CY",
      },
      {
        title: "Video From Youtube CURRENT_AFFAIRS",
        ytURl: "https://www.youtube.com/watch?v=L_ZvvcpH0b0",
      },
      {
        title: "Video From Youtube CURRENT_AFFAIRS",
        ytURl: "https://www.youtube.com/watch?v=K6l3yI8RG9E",
      },
    ],
  },
];
=======
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
>>>>>>> Stashed changes
