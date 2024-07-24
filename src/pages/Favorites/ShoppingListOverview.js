import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingListBox from "../../components/Shoppinglist/ShoppingListBox";
import { fetchShoppingLists } from "../../store/recipe-slice";

const ShoppingListOverview = () => {
  const dispatch = useDispatch();
  const { shoppingLists, loading } = useSelector((state) => state.recipes);
  const userId = useSelector((state) => state.users.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchShoppingLists(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="p-4 max-w-md mx-auto">
      {loading && <p>Loading...</p>}
      {!loading && shoppingLists && shoppingLists.length > 0 ? (
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
