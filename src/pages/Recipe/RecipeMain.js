// components/RecipeMain.js
import React, { useState } from "react";
import { getRecipeFromAI } from "../../services/openaiApi";
import IngredientInput from "./IngredientInput";
import Title from "../../components/General/Title";
import OptionalInputs from "../../components/AI/OptionalInputs";
import FileUpload from "../../components/AI/FileUpload";
import TextAIInputs from "../../components/AI/TextAIInputs";

const RecipeMain = () => {
  const [recipe, setRecipe] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showIngredients, setShowIngredients] = useState(false);

  const title = "Rezepte";
  const options = [
    {
      name: "diet",
      values: ["Mit Fleisch", "Vegetarisch", "Vegan"],
    },
    {
      name: "spice",
      values: ["Scharf", "Mild"],
    },
    // Add more options as needed
  ];

  const instructions = "Erklären Sie, was Sie essen möchten";

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

  const handleInputChange = (input) => {
    setUserInput(input);
  };

  const handleAIInputSubmit = async () => {
    try {
      const optionsArray = Object.values(additionalOptions);
      const result = await getRecipeFromAI(
        userInput,
        optionsArray,
        file,
        ingredients
      );
      setRecipe(result);
    } catch (error) {
      console.error("Fehler beim Abrufen des Rezepts:", error);
    }
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
      <TextAIInputs
        instructions={instructions}
        onInputChange={handleInputChange}
      />
      <FileUpload onFileUpload={handleFileUpload} />
      <button
        onClick={handleAIInputSubmit}
        className="block w-full p-2 bg-teal-500 text-white rounded mt-4"
      >
        Ask AI
      </button>
      {recipe && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{recipe.recipe_title}</h2>
          <h3 className="text-lg mt-2">Zutaten</h3>
          <p>{recipe.ingredients}</p>
          <h3 className="text-lg mt-2">Anweisungen</h3>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeMain;
