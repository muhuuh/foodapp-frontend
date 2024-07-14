// components/Shopping/ShoppingDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchShoppingListById } from "../../store/recipe-slice"; // Import the thunk

const ShoppingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const shoppingList = useSelector((state) =>
    state.recipes.shoppingLists.find((list) => list.id === id)
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shoppingList) {
      dispatch(fetchShoppingListById(id)).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, id, shoppingList]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!shoppingList) {
    return <p>Shopping list not found.</p>;
  }

  const handleBackClick = () => {
    navigate("/favorites", { state: { view: "Shoppinglist" } });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        onClick={handleBackClick}
        className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full"
      >
        ← Zurück
      </button>
      <h1 className="text-2xl font-bold mb-4">{shoppingList.list_name}</h1>
      <ul className="list-disc ml-6 mb-4">
        {shoppingList.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {shoppingList.user_comment && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Kommentar</h2>
          <p>{shoppingList.user_comment}</p>
        </div>
      )}
    </div>
  );
};

export default ShoppingDetail;
