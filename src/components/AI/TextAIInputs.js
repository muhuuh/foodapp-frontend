import React, { useState } from "react";

const TextAIInputs = ({ onSubmit, instructions }) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userInput);
    setUserInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="block w-full p-2 mb-2 border rounded"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={instructions}
      />
      <button
        type="submit"
        className="block w-full p-2 bg-teal-500 text-white rounded"
      >
        Ask AI
      </button>
    </form>
  );
};

export default TextAIInputs;
