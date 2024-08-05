import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../../components/General/Title";
import FileUpload from "../../components/AI/FileUpload";
import TextAIInputs from "../../components/AI/TextAIInputs";
import { getSearchResultsFromAI } from "../../services/openaiApi";
import {
  saveAIOutputToStore,
  fetchIngredients,
  fetchIngredientsByName,
} from "../../store/ingredient-slice";
import IngredientCarousel from "../../components/Search/IngredientCarousel";
import LoadingSpinner from "../../components/General/LoadingSpinner";

const LocalIngredientSearch = () => {
  const title = "Suche";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient_general_available = useSelector(
    (state) => state.ingredients.ingredient_general_available
  );
  const ai_ingredient_search = useSelector(
    (state) => state.ingredients.ai_ingredient_search
  );

  const [searchType, setSearchType] = useState("Durchforsten");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [navigateToIngredients, setNavigateToIngredients] = useState(false);

  console.log("main ingredient");

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (
      navigateToIngredients &&
      ai_ingredient_search?.ingredients_available?.length > 0
    ) {
      dispatch(
        fetchIngredientsByName(ai_ingredient_search.ingredients_available)
      );
      navigate("/ingredient_overview");
      setNavigateToIngredients(false); // Reset the navigation control
    }
  }, [dispatch, ai_ingredient_search, navigate, navigateToIngredients]);

  const handleToggle = () => {
    setSearchType(searchType === "Durchforsten" ? "Frag AI" : "Durchforsten");
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
        "Ingredients",
        file,
        selectedIngredients,
        ingredient_general_available
      );
      dispatch(saveAIOutputToStore(result));
      setNavigateToIngredients(true); // Set the navigation control to true
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
        <span className="mr-2">Durchforsten</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={searchType === "Frag AI"}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-teal-300 dark:bg-gray-700 peer dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
        </label>
        <span className="ml-2">Frag AI</span>
      </div>
      {searchType === "Durchforsten" ? (
        <>
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
              <LoadingSpinner />
              <span className="text-sm text-gray-600">Bitte warten...</span>
            </div>
          )}
        </>
      ) : (
        // Placeholder for the AI Search Component
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-gray-600">AI Search Component</span>
        </div>
      )}
    </div>
  );
};

export default LocalIngredientSearch;
