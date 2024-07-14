import React from "react";
import ShoppingListBox from "../../components/Shoppinglist/ShoppingListBox";

const ShoppingListOverview = ({ shoppingLists }) => {
  return (
    <div className="p-4 max-w-md mx-auto">
      {shoppingLists && shoppingLists.length > 0 ? (
        shoppingLists.map((list) => (
          <ShoppingListBox key={list.id} shoppingList={list} />
        ))
      ) : (
        <p>Keine Shoppinglisten verfügbar.</p>
      )}
    </div>
  );
};

export default ShoppingListOverview;
