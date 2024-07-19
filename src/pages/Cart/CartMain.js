import React from "react";
import { useSelector } from "react-redux";

const CartMain = () => {
  const { currentCart } = useSelector((state) => state.cart);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Warenkorb</h1>
      <ul className="list-disc ml-6 mb-4">
        {currentCart.cart_ingredients.map((item, index) => (
          <li key={index} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">
                  {item.ingredient.store_specific_name}
                </p>
                <p>
                  Menge: {item.amount} {item.ingredient.pack_size}
                </p>
                <p>
                  Preis:{" "}
                  {(item.amount * parseFloat(item.ingredient.price)).toFixed(2)}
                  €
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Gesamt</h2>
        <p>Menge: {currentCart.cart_total_amount}</p>
        <p>Preis: {currentCart.cart_total_price.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default CartMain;
