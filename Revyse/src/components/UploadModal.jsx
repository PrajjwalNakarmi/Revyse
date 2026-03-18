import { useState, useRef, useEffect } from "react";

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
  isUploading = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setIsDragging(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ UPDATED VALIDATION (PDF + IMAGE)
  const handleFileSelect = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Image (JPG, PNG)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File must be smaller than 10MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile || isUploading) return;
    onUpload(selectedFile);
  };

  const formatFileSize = (bytes) =>
    (bytes / (1024 * 1024)).toFixed(2) + " MB";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!isUploading) onClose();
        }}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Upload Resume
          </h2>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="text-gray-400 hover:text-gray-600 text-lg disabled:opacity-50"
          >
            ×
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
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileSelect(e.dataTransfer.files?.[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-gray-600 font-medium">
              Drag and drop your resume here
            </p>
            <p className="text-sm text-gray-400 mt-1">
              or click to browse
            </p>

            {/* ✅ UPDATED INPUT */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={(e) =>
                handleFileSelect(e.target.files?.[0])
              }
            />

            <p className="text-xs text-gray-400 mt-3">
              Supported: PDF, JPG, PNG
            </p>
          </div>
        ) : (
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              disabled={isUploading}
              className="text-red-500 text-sm hover:underline disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="px-4 py-2 text-sm rounded-md border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              isUploading
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