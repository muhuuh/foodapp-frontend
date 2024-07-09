// components/FileUpload.js
import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    onFileUpload(uploadedFile);
  };

  return (
    <div className="mt-2">
      <input
        type="file"
        onChange={handleFileChange}
        className="text-sm text-gray-600 underline"
      />
    </div>
  );
};

export default FileUpload;
