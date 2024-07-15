// components/Shopping/ShoppingDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchShoppingListById,
  updateShoppingListInDB,
} from "../../store/recipe-slice";

const ShoppingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingList = useSelector((state) =>
    state.recipes.shoppingLists.find((list) => list.id === id)
  );
  const userId = useSelector((state) => state.users.userId);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
  });

  useEffect(() => {
    if (!shoppingList) {
      dispatch(fetchShoppingListById(id)).then(() => setLoading(false));
    } else {
      setLoading(false);
      setIngredients(
        shoppingList.ingredients.map((item) => {
          const [name, quantity] = item.split(":");
          return { name: name.trim(), quantity: quantity?.trim() || "" };
        })
      );
    }
  }, [dispatch, id, shoppingList]);

  const handleBackClick = () => {
    navigate("/favorites", { state: { view: "Shoppinglist" } });
  };

  const handleQuantityChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ name: "", quantity: "" });
    }
  };

  const handleSave = () => {
    const updatedIngredients = ingredients.map(
      (item) => `${item.name}: ${item.quantity}`
    );
    dispatch(
      updateShoppingListInDB({
        id: shoppingList.id,
        ingredients: updatedIngredients,
      })
    ).then(() => handleBackClick());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!shoppingList) {
    return <p>Shopping list not found.</p>;
  }

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
        {ingredients.map((ingredient, index) => (
          <li key={index} className="mb-2 flex items-center justify-between">
            <span className="mr-2">{ingredient.name}</span>
            <input
              type="text"
              value={ingredient.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              className="mr-2 p-1 border rounded w-16"
            />
            <button
              onClick={() => handleRemoveIngredient(index)}
              className="p-1 bg-red-500 text-white rounded"
            >
              Entfernen
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          value={newIngredient.name}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, name: e.target.value })
          }
          placeholder="Neue Zutat"
          className="mr-2 p-1 border rounded w-24"
        />
        <input
          type="text"
          value={newIngredient.quantity}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, quantity: e.target.value })
          }
          placeholder="Menge"
          className="mr-2 p-1 border rounded w-16"
        />
        <button
          onClick={handleAddIngredient}
          className="p-1 bg-green-500 text-white rounded"
        >
          Hinzufügen
        </button>
      </div>
      {userId ? (
        <button
          onClick={handleSave}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Speichern
        </button>
      ) : (
        <button
          onClick={() => navigate("/signin")}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Anmelden
        </button>
      )}
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
