// components/TextAIInputs.js
import React, { useState } from "react";

const TextAIInputs = ({ onInputChange, instructions }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    onInputChange(input);
  };

  return (
    <div className="mb-4">
      <textarea
        className="block w-full p-2 mb-2 border rounded"
        value={userInput}
        onChange={handleChange}
        placeholder={instructions}
      />
    </div>
  );
};

export default TextAIInputs;
