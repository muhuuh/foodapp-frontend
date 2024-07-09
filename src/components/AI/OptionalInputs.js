import React, { useState } from "react";

const OptionalInputs = ({ options, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="mb-4">
      <button
        className="text-sm text-gray-600 underline"
        onClick={() => setShowOptions(!showOptions)}
      >
        Optionale Anweisungen {showOptions ? "▲" : "▼"}
      </button>
      {showOptions && (
        <div className="mt-2">
          {options.map((option, index) => (
            <select
              key={index}
              name={option.name}
              className="block mb-2 p-2 border rounded"
              onChange={handleChange}
            >
              {option.values.map((value, idx) => (
                <option key={idx} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionalInputs;
