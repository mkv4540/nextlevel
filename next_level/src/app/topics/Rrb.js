import Image from "next/image";
export default function  RRB  () {
    const handleCardClick = () => {
   
      window.open("https://www.youtube.com/watch?v=GB2kRJlR9v4", "_blank");
    };
  
    const handleQuizClick = (e) => {
      e.stopPropagation(); 
      window.open("", "_blank"); 
    };
  
    return (
      <div className="flex justify-start p-5">
        <div
          className="w-72 m-5 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-100 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          onClick={handleCardClick}
        >
          <Image
            src="https://img.youtube.com/vi/GB2kRJlR9v4/0.jpg"
            height={40}
            width={40}
            alt="YouTube Thumbnail"
            className="w-full rounded-md mb-2"
          />
          <div className="text-lg font-bold text-gray-800 mb-2">RRB NTPC</div>
  
         
          <div className="flex justify-center gap-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md font-bold text-sm hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  "https://www.youtube.com/watch?v=GB2kRJlR9v4",
                  "_blank"
                );
              }}
            >
              Watch on YouTube
            </button>
  
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md font-bold text-sm hover:bg-green-600"
              onClick={handleQuizClick}
            >
              Quiz
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  