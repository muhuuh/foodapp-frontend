import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartLocal } from "../../store/cart-slice";

const CartButton = ({ ingredient }) => {
  const dispatch = useDispatch();
  const cartIngredients = useSelector(
    (state) => state.cart.currentCart.cart_ingredients
  );
  const currentIngredient = cartIngredients.find(
    (item) =>
      item.ingredient.general_name === ingredient.general_name &&
      item.ingredient.store_id === ingredient.store_id
  );

  const currentAmount = currentIngredient ? currentIngredient.amount : 0;

  const handleIncrease = () => {
    dispatch(updateCartLocal({ ingredient, amount: 1, action: "increase" }));
  };

  const handleDecrease = () => {
    dispatch(updateCartLocal({ ingredient, amount: 1, action: "decrease" }));
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrease}
        className="p-2 bg-blue-500 text-white rounded mr-2"
      >
        -
      </button>
      <span>{currentAmount}</span>
      <button
        onClick={handleIncrease}
        className="p-2 bg-blue-500 text-white rounded ml-2"
      >
        +
      </button>
    </div>
  );
};

export default CartButton;
