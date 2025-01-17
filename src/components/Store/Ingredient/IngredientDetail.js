import React from "react";
import { useSelector } from "react-redux";
import CartButton from "../../Cart/CartButton";

const IngredientDetail = ({ general_name }) => {
  const data = useSelector((state) => state.ingredients);

  const ingredientDetails = data.ingredients.filter(
    (ingredient) => ingredient.general_name === general_name
  );

  return (
    <div className="border rounded p-4 mb-4">
      {ingredientDetails.map((ingredient, index) => (
        <div key={index} className="border-t pt-2 mt-2">
          <p>
            <strong>Store:</strong> {ingredient.store_id}
          </p>
          <p>
            <strong>Name:</strong> {ingredient.store_specific_name}
          </p>
          <p>
            <strong>Pack Size:</strong> {ingredient.pack_size}
          </p>
          <p>
            <strong>Price:</strong> {ingredient.price}€
          </p>
          <CartButton ingredient={ingredient} />
        </div>
      ))}
    </div>
  );
};

export default IngredientDetail;
