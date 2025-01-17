// components/RecipeMain.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeFromAI } from "../../services/openaiApi";
import {
  saveRecipesToDB,
  addRecipesToStore,
  updateRecipesWithImages,
} from "../../store/recipe-slice";
import IngredientInput from "../../components/Recipes/IngredientInput";
import Title from "../../components/General/Title";
import OptionalInputs from "../../components/AI/OptionalInputs";
import FileUpload from "../../components/AI/FileUpload";
import TextAIInputs from "../../components/AI/TextAIInputs";
import LoadingSpinner from "../../components/General/LoadingSpinner";

const RecipeMain = () => {
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showIngredients, setShowIngredients] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.userId);

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
    setIsLoading(true);
    try {
      const optionsArray = Object.values(additionalOptions);
      const recipes = await getRecipeFromAI(
        userInput,
        optionsArray,
        file,
        ingredients
      );

      const savedRecipes = await dispatch(
        saveRecipesToDB({ userId, recipes })
      ).unwrap();

      dispatch(addRecipesToStore(savedRecipes));
      navigate("/recipe_overview");

      // Update the recipes with images
      dispatch(updateRecipesWithImages());
    } catch (error) {
      console.error("Fehler beim Abrufen des Rezepts:", error);
    } finally {
      setIsLoading(false);
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
      {isLoading && (
        <div className="flex flex-col items-center mt-4">
          <LoadingSpinner />
          <span className="text-sm text-gray-600">Bitte 10s warten...</span>
        </div>
      )}
    </div>
  );
};

export default RecipeMain;
