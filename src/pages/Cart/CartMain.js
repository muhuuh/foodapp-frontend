import React from "react";
import { useSelector } from "react-redux";
import CartButton from "../../components/Cart/CartButton";

const CartMain = () => {
  const cart = useSelector((state) => state.cart.currentCart);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Warenkorb</h1>
      <ul className="list-disc ml-6 mb-4">
        {cart.cart_ingredients.map((item, index) => (
          <li key={index} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">
                  {item.ingredient.store_specific_name}
                </span>{" "}
                - {item.ingredient.store_id}
                <p>Menge: {item.amount}</p>
                <p>
                  Preis:{" "}
                  {(item.amount * parseFloat(item.ingredient.price)).toFixed(2)}
                  €
                </p>
              </div>
              <CartButton ingredient={item.ingredient} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Gesamt</h2>
        <p>Menge: {cart.cart_total_amount}</p>
        <p>Preis: {cart.cart_total_price.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default CartMain;
