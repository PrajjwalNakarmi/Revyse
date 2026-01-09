import { useState, useRef } from "react";

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
  isUploading = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (file) => {
    const allowedExtensions = ["pdf", "doc", "docx", "txt"];
    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      alert("Please upload a PDF, DOC, DOCX, or TXT file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File must be smaller than 10MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    onUpload(selectedFile);
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Upload Resume
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Dropzone */}
        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileSelect(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <p className="text-gray-600 font-medium">
              Drag & drop your resume here
            </p>
            <p className="text-sm text-gray-400 mt-1">
              or click to browse
            </p>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              isUploading || !selectedFile
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isUploading ? "Analyzing..." : "Upload Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
