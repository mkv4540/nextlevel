// "use client";
// import { useState } from "react";

// const UploadForm = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       console.log(data.status);
//       setUploading(false);
//     } catch (error) {
//       console.log(error);
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-white shadow-md rounded-lg p-6 w-96">
//         <h1 className="text-xl font-bold text-center mb-6">Upload Files to S3 Bucket</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
//           />
//           <button
//             type="submit"
//             disabled={!file || uploading}
//             className={`w-full py-2 rounded text-white font-semibold ${
//               uploading || !file
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-500 hover:bg-red-600"
//             }`}
//           >
//             {uploading ? "Uploading..." : "Upload"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadForm;





"use client";
import { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !folderName) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", folderName);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log(`File uploaded to folder: ${data.fileName}`);
      } else {
        console.error("Error:", data.error);
      }
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-bold text-center mb-6">Upload Files to S3 Bucket</h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            className="w-full px-4 py-2 border rounded text-gray-700"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!file || !folderName || uploading}
            className={`w-full py-2 rounded text-white font-semibold ${
              uploading || !file || !folderName
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;