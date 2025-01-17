// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// // Define getVideoId if not already defined
// const getVideoId = (url) => {
//   const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// const DynamicCard = ({ videoId, title }) => {
//   const router = useRouter();

//   const navigateToQuiz = (id) => {
//     if (id) {
//       router.push(`/quiz?videoId=${id}`);
//     } else {
//       console.error("Invalid video ID");
//     }
//   };

//   const id = getVideoId(videoId); // Extract video ID once
//   console.log("video", videoId);
//   console.log("Extracted video ID:", id);
//   console.log("Title:", title);

//   return (
//     <div
//       className="w-full max-w-xs transition-transform ease-in-out duration-80 card hover:scale-105 md:p-5 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
//       style={{
//         objectFit: "contain",
//         height: "auto",
//         border: "2px solid #e0e0e0",
//         padding: "1rem",
//         borderRadius: "12px",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         backgroundColor: "#ffffff",
//       }}
//     >
//       <div
//         className="thumbnail$buttons"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           flexWrap: "wrap",
//           height: "100%",
//           width: "100%",
//           padding: "0.1rem",
//           borderRadius: "8px",
//           position: "relative",
//           gap: "3rem",
//         }}
//       >
//         <Image
//           src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
//           alt="image"
//           className="rounded-lg"
//           width={200}
//           height={200}
//         />
//         <div className="absolute inset-0 transition-colors duration-300 bg-black/5 hover:bg-black/10"></div>
//       </div>

//       {/* Content Section */}
//       <div className="p-4">
//         <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
//           {title}
//         </h3>

//         <p className="mb-3 text-sm text-gray-600">Next Level Academy</p>

//         <div className="flex gap-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(videoId, "_blank"); // Open the YouTube URL in a new tab
//             }}
//             className="flex-1 px-3 py-2 text-sm font-semibold text-white transition-colors bg-red-600 rounded hover:bg-red-700"
//           >
//             Watch on YouTube
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               navigateToQuiz(id); // Navigate to the quiz page
//             }}
//             className="px-3 py-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
//           >
//             Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DynamicCard;

import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const navigateToQuiz = (videoId) => {
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
          src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
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