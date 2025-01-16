export default function YouTubePlayer({ videoId, onClose }) {
  if (!videoId) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/75"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl p-10 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
      >
        <button
          onClick={onClose}
          className="absolute text-lg font-bold text-white-600 top-2 right-2"
        >
          ✖
        </button>

        <div
          className="relative w-full h-0"
          style={{ paddingBottom: "56.25%" }} // Aspect ratio 16:9
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Video"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

