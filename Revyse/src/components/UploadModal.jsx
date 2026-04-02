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
      alert("Please upload a PDF or image (JPG, PNG, WEBP)");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f2a34]/45 px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!isUploading) onClose();
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl border border-[#1f5d66]/20 bg-[#f7f4ee] p-6 shadow-[0_30px_120px_-70px_rgba(15,42,52,0.8)]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload Resume
          </h2>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="text-lg text-slate-400 transition hover:text-slate-600 disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Dropzone */}
        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
              isDragging
                ? "border-[#1f5d66] bg-[#eaf3f4]"
                : "border-[#1f5d66]/25 bg-white/65"
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
            <p className="font-medium text-slate-700">
              Drag and drop your resume here
            </p>
            <p className="mt-1 text-sm text-slate-500">
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

            <p className="mt-3 text-xs text-slate-500">
              Supported: PDF, JPG, PNG, WEBP
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-[#1f5d66]/15 bg-white/70 p-4">
            <div>
              <p className="font-medium text-slate-800">
                {selectedFile.name}
              </p>
              <p className="text-sm text-slate-500">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              disabled={isUploading}
              className="text-sm text-[#8b2b2b] hover:underline disabled:opacity-50"
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
            className="rounded-full border border-[#1f5d66]/20 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-[#f7fbfb] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
              isUploading
                ? "cursor-not-allowed bg-slate-400"
                : "bg-[#0f2a34] hover:bg-[#15424b]"
            }`}
          >
            {isUploading ? "Analyzing..." : "Upload Resume"}
          </button>
        </div>

      </div>
    </div>
  );
}