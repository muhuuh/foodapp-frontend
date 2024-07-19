import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartLocal } from "../../store/cart-slice";

const CartButton = ({ ingredient }) => {
  const dispatch = useDispatch();
  const cartIngredients = useSelector(
    (state) => state.cart.currentCart.cart_ingredients
  );

  const existingIngredient = cartIngredients.find(
    (item) =>
      item.ingredient.general_name === ingredient.general_name &&
      item.ingredient.store_id === ingredient.store_id
  );

  const amount = existingIngredient ? existingIngredient.amount : 0;

  const handleIncrease = () => {
    dispatch(
      updateCartLocal({
        ingredient,
        amount: 1,
        action: "increase",
      })
    );
  };

  const handleDecrease = () => {
    if (amount > 0) {
      dispatch(
        updateCartLocal({
          ingredient,
          amount: 1,
          action: "decrease",
        })
      );
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrease}
        className="p-2 bg-red-500 text-white rounded"
      >
        -
      </button>
      <span className="mx-2">{amount}</span>
      <button
        onClick={handleIncrease}
        className="p-2 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  );
};

export default CartButton;
