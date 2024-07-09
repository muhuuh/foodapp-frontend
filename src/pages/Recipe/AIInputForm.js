// components/AIInputForm.js
import React, { useState } from "react";

import IngredientInput from "./IngredientInput";
import Title from "../../components/General/Title";
import OptionalInputs from "../../components/AI/OptionalInputs";
import FileUpload from "../../components/AI/FileUpload";
import TextAIInputs from "../../components/AI/TextAIInputs";

const AIInputForm = ({ onSubmit, options, instructions, title }) => {
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleOptionChange = (name, value) => {
    setAdditionalOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleIngredientChange = (newIngredients) => {
    setIngredients(newIngredients);
  };

  const handleSubmit = (userInput) => {
    onSubmit(userInput, additionalOptions, file, ingredients);
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <Title text={title} />
      <OptionalInputs
        options={options}
        onChange={handleOptionChange}
        showIngredients={showIngredients}
        setShowIngredients={setShowIngredients}
      />
      <IngredientInput
        onChange={handleIngredientChange}
        showIngredients={showIngredients}
      />
      <TextAIInputs instructions={instructions} onSubmit={handleSubmit} />
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
};

export default AIInputForm;
