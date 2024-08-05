// components/Search/CategorySearch.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientsByCategory } from "../../store/ingredient-slice";
import IngredientBox from "../Store/Ingredient/IngredientBox";

// Importing the images
import GemueseImg from "../../assets/categories/Gemuese.png";
import ObstImg from "../../assets/categories/Obst.png";
import TrockenprodukteImg from "../../assets/categories/Trockenprodukte.png";
import MilchprodukteImg from "../../assets/categories/Milchprodukte.png";
import FleischImg from "../../assets/categories/Fleisch.png";
import BackwarenImg from "../../assets/categories/Backwaren.png";
import LoadingSpinner from "../General/LoadingSpinner";

const CategorySearch = () => {
  const dispatch = useDispatch();
  const ingredientsByCategory = useSelector(
    (state) => state.ingredients.ingredientsByCategory
  );
  const loading = useSelector((state) => state.ingredients.loading);
  const categories = [
    "Gemuese",
    "Obst",
    "Trockenprodukte",
    "Milchprodukte",
    "Fleisch",
    "Backwaren",
  ];
  const categoryImages = {
    Gemuese: GemueseImg,
    Obst: ObstImg,
    Trockenprodukte: TrockenprodukteImg,
    Milchprodukte: MilchprodukteImg,
    Fleisch: FleischImg,
    Backwaren: BackwarenImg,
  };
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    if (selectedCategory && !ingredientsByCategory[selectedCategory]) {
      dispatch(fetchIngredientsByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch, ingredientsByCategory]);

  return (
    <div className="p-4 max-w-md mx-auto mb-16">
      <div className="flex overflow-x-auto pb-2 space-x-2 my-4 mx-4">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`pt-4 px-4 rounded cursor-pointer mb-2 ${
              selectedCategory === category
                ? "bg-limeGreenDark bg-opacity-80"
                : ""
            }`}
          >
            <div
              style={{
                backgroundImage: `url(${categoryImages[category]})`,
              }}
              className="bg-cover bg-center rounded w-32 h-32 mx-auto"
            />
            <h2 className="font-semibold text-gray-700 text-center mb-2 tracking-wide">
              {category}
            </h2>
          </div>
        ))}
      </div>
      {loading && !ingredientsByCategory[selectedCategory] ? (
        <LoadingSpinner />
      ) : (
        <div>
          {ingredientsByCategory[selectedCategory]?.map((ingredient, index) => (
            <IngredientBox key={index} ingredient={ingredient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySearch;
