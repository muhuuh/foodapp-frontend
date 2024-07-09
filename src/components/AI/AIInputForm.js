// components/AIInputForm.js
import React, { useState } from "react";
import Title from "../General/Title";
import OptionalInputs from "./OptionalInputs";
import TextAIInputs from "./TextAIInputs";
import FileUpload from "./FileUpload";

const AIInputForm = ({ onSubmit, options, instructions }) => {
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [file, setFile] = useState(null);

  const handleOptionChange = (name, value) => {
    setAdditionalOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleSubmit = (userInput) => {
    onSubmit(userInput, additionalOptions, file);
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <Title text="Rezepte" />
      <OptionalInputs options={options} onChange={handleOptionChange} />
      <TextAIInputs instructions={instructions} onSubmit={handleSubmit} />
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
};

export default AIInputForm;
