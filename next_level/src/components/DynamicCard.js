// DynamicCard.js
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router';

const getVideoId = (url) => {
  try {
    const parsedUrl = new URL(url); // Parse the URL
    if (parsedUrl.searchParams.has("v")) {
      // Standard format with ?v=
      return parsedUrl.searchParams.get("v");
    } else if (parsedUrl.pathname.startsWith("/embed/")) {
      // Embed format
      return parsedUrl.pathname.split("/embed/")[1];
    } else if (parsedUrl.hostname === "youtu.be") {
      // Shortened format
      return parsedUrl.pathname.slice(1); // Remove the leading '/'
    } else {
      console.error("Unsupported URL format:", url);
      return null;
    }
  } catch (error) {
    console.error("Invalid URL:", url, error);
    return null;
  }
};


const DynamicCard = ({ videoId, title, onButtonClick }) => {
  const navigateToQuiz = (videoId) => {
  const router = useRouter();
  const id = getVideoId(videoId); // Get the video ID from the URL
  if (videoId) {
    router.push(`/quiz?videoId=${id}`); // Navigate to the quiz page
  }
};
  console.log("video", videoId);
  const id = getVideoId(videoId);
  console.log(id);
  console.log("title is ", title);
  return (
    <div
      className="w-full max-w-xs transition-transform ease-in-out duration-80 card hover:scale-105 md:p-5 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      style={{
        objectFit: "contain",
        height: "auto",
        border: "2px solid #e0e0e0",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="thumbnail$buttons"
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          height: "100%",
          width: "100%",
          padding: "0.1rem",
          borderRadius: "8px",
          position: "relative",
          gap: "3rem",
        }}
      >
        <Image
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt="image"
          className="rounded-lg "
          width={200}
          height={200}

        />
        {/* <button onClick={onButtonClick}>bfdbfd </button> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
            width: "100%",
          }}
        >
          <button
            onClick={onButtonClick}
            className="px-3 py-3 text-sm font-semibold text-white transition-colors bg-red-600 rounded flex-4 hover:bg-red-700"
          >
            Watch Lecture
          </button>
          <button
            onClick={() => {navigateToQuiz(videoId)}}
            className="px-3 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded flex-4 hover:bg-blue-700"
          >
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
