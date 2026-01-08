import { useState, useRef } from "react";
import "./UploadModal.css";

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
  isUploading = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (isUploading) return;

    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    const allowedExtensions = ["pdf", "doc", "docx", "txt"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Please upload a PDF, DOC, DOCX, or TXT file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    if (isUploading) return;

    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !onUpload || isUploading) return;
    onUpload(selectedFile);
  };

  const handleBrowseClick = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="upload-modal-overlay" onClick={!isUploading ? onClose : undefined}>
      <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal-header">
          <h2 className="upload-modal-title">Upload Resume</h2>
          <button
            className="upload-modal-close"
            onClick={onClose}
            disabled={isUploading}
          >
            ✕
          </button>
        </div>

        <div className="upload-modal-body">
          {!selectedFile ? (
            <div
              className={`upload-dropzone ${isDragging ? "dragging" : ""}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <h3>Drag & drop your resume here</h3>
              <p>or</p>
              <button className="browse-button" onClick={handleBrowseClick}>
                Browse Files
              </button>
              <p>PDF and Images (Max 10MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                hidden
              />
            </div>
          ) : (
            <div className="file-preview">
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">{formatFileSize(selectedFile.size)}</p>
              {!isUploading && (
                <button className="file-remove" onClick={handleRemoveFile}>
                  Remove
                </button>
              )}
            </div>
          )}
        </div>

        <div className="upload-modal-footer">
          <button className="cancel-button" onClick={onClose} disabled={isUploading}>
            Cancel
          </button>
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Analyzing..." : "Upload Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
