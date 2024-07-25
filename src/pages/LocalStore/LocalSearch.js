import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/General/Title";
import FileUpload from "../../components/AI/FileUpload";
import TextAIInputs from "../../components/AI/TextAIInputs";
import { getSearchResultsFromAI } from "../../services/openaiApi";
import { saveAIOutputToStore } from "../../store/user-slice";
import IngredientCarousel from "../../components/Search/IngredientCarousel";

const LocalSearch = () => {
  const title = "Suche";
  const [searchType, setSearchType] = useState("Ingredients");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setSearchType(searchType === "Ingredients" ? "Shop" : "Ingredients");
  };

  const handleInputChange = (input) => {
    setUserInput(input);
  };

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await getSearchResultsFromAI(
        userInput,
        searchType,
        file,
        selectedIngredients
      );
      console.log("result search");
      console.log(result);
      dispatch(saveAIOutputToStore(result));
    } catch (error) {
      console.error("Error fetching search results from OpenAI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Title text={title} />

      <div className="flex justify-center my-4 items-center">
        <span className="mr-2">Zutaten</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={searchType === "Shop"}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-teal-300 peer dark:bg-gray-700 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
        </label>
        <span className="ml-2">Shop</span>
      </div>
      <IngredientCarousel
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <TextAIInputs
        instructions="Erklären Sie, was Sie suchen"
        onInputChange={handleInputChange}
      />
      <FileUpload onFileUpload={handleFileUpload} />
      <button
        onClick={handleSearch}
        className="block w-full p-2 bg-teal-500 text-white rounded mt-4"
        disabled={isLoading}
      >
        Ask AI
      </button>
      {isLoading && (
        <div className="flex flex-col items-center mt-4">
          <div className="loader"></div>
          <span className="text-sm text-gray-600">Bitte warten...</span>
        </div>
      )}
    </div>
  );
};

export default LocalSearch;
