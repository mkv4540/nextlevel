"use client";
import { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isExistingFolder, setIsExistingFolder] = useState(true);
  const [selectedBucket, setSelectedBucket] = useState("nextlevel-classnotes");
  const [folders, setFolders] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !folderName || !fileName || !selectedBucket) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName); // Added fileName to formData
    formData.append("folderName", folderName);
    formData.append("isExistingFolder", isExistingFolder);
    formData.append("bucketName", selectedBucket);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ text: "File uploaded successfully!", type: "success" });
        setFile(null);
        setFileName("");
        setFolderName("");
      } else {
        setMessage({ text: data.error || "Failed to upload file.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetch(`/api/upload?bucket=${selectedBucket}`);
      const data = await response.json();
      if (data.success) {
        setFolders(data.folders || []);
      } else {
        setMessage({ text: data.error || "Failed to fetch folders.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred while fetching folders.", type: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-bold text-center mb-6">Upload Files to S3 Bucket</h1>

        {message && (
          <div
            className={`mb-4 text-center p-2 rounded ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="flex gap-4 items-center">
            <label>
              <input
                type="radio"
                name="folderType"
                checked={isExistingFolder}
                onChange={() => setIsExistingFolder(true)}
              />
              Existing Folder
            </label>
            <label>
              <input
                type="radio"
                name="folderType"
                checked={!isExistingFolder}
                onChange={() => setIsExistingFolder(false)}
              />
              New Folder
            </label>
          </div>

          <select
            value={selectedBucket}
            onChange={(e) => setSelectedBucket(e.target.value)}
            className="w-full px-4 py-2 border rounded text-gray-700"
          >
            <option value="nextlevel-classnotes">nextlevel-classnotes</option>
            <option value="ncert-notes-nextlevel">ncert-notes-nextlevel</option>
          </select>

          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
            className="w-full px-4 py-2 border rounded text-gray-700"
          />

          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder={`Enter ${isExistingFolder ? "existing" : "new"} folder name`}
            className="w-full px-4 py-2 border rounded text-gray-700"
          />

          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />

          <button
            type="submit"
            disabled={!file || !fileName || !folderName || uploading}
            className={`w-full py-2 rounded text-white font-semibold ${
              uploading || !file || !fileName || !folderName
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {folders.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Existing Folders:</h2>
            <ul>
              {folders.map((folder) => (
                <li key={folder} className="text-gray-700">
                  {folder}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
