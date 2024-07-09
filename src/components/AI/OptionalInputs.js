// components/OptionalInputs.js
import React, { useState } from "react";

const OptionalInputs = ({
  options,
  onChange,
  showIngredients,
  setShowIngredients,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggle = () => {
    setShowOptions(!showOptions);
    setShowIngredients(!showIngredients);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="mb-4">
      <button
        className="text-sm text-gray-600 underline"
        onClick={handleToggle}
      >
        Optionale Anweisungen {showOptions ? "▲" : "▼"}
      </button>
      {showOptions && (
        <div className="mt-2 grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index}>
              <select
                name={option.name}
                className="block w-full mt-2 p-2 border rounded"
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  {option.name}
                </option>
                {option.values.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionalInputs;
