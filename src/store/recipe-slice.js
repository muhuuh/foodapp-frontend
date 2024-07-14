// store/recipesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";
import { generateImageForRecipe } from "../services/openaiApi";

// Async thunk to fetch recipes from the database
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to save recipes to the database
export const saveRecipesToDB = createAsyncThunk(
  "recipes/saveRecipesToDB",
  async ({ userId, recipes }, { rejectWithValue }) => {
    try {
      const recipeInserts = recipes.map((recipe) => ({
        user_id: userId,
        recipe_info: recipe,
        created_at: new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from("recipes")
        .insert(recipeInserts)
        .select(); // Select the inserted data including IDs

      if (error) {
        throw new Error(error.message);
      }
      return data; // return inserted data with IDs
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to delete a recipe from the database
export const deleteRecipeFromDB = createAsyncThunk(
  "recipes/deleteRecipeFromDB",
  async (recipeId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipeId);

      if (error) {
        throw new Error(error.message);
      }
      return recipeId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to toggle the favorite status of a recipe
export const toggleFavoriteRecipeInDB = createAsyncThunk(
  "recipes/toggleFavoriteRecipeInDB",
  async ({ recipeId, favorited }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .update({ favorited })
        .eq("id", recipeId);

      if (error) {
        throw new Error(error.message);
      }
      return { recipeId, favorited };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to toggle shopping list
export const toggleShoppingList = createAsyncThunk(
  "recipes/toggleShoppingList",
  async ({ userId, ingredients }, { rejectWithValue, getState }) => {
    try {
      const { shoppingLists } = getState().recipes;
      const existingList = shoppingLists.find(
        (list) =>
          list.user_id === userId &&
          JSON.stringify(list.ingredients) === JSON.stringify(ingredients)
      );

      if (existingList) {
        // Remove the existing shopping list
        const { error } = await supabase
          .from("shopping_list")
          .delete()
          .eq("id", existingList.id);

        if (error) {
          throw new Error(error.message);
        }
        return { action: "removed", id: existingList.id };
      } else {
        // Add new shopping list
        const { data, error } = await supabase
          .from("shopping_list")
          .insert({ user_id: userId, ingredients });

        if (error) {
          throw new Error(error.message);
        }
        return { action: "added", list: data[0] };
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addShoppingList = createAsyncThunk(
  "recipes/addShoppingList",
  async ({ userId, listName, ingredients }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("shopping_list")
        .insert({ user_id: userId, list_name: listName, ingredients });

      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// store/recipesSlice.js
export const updateRecipeInDB = createAsyncThunk(
  "recipes/updateRecipeInDB",
  async ({ id, recipe_info }, { rejectWithValue }) => {
    console.log("recipe_info");
    console.log(id);
    console.log(recipe_info);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .update({ recipe_info })
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return { id, recipe_info };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateRecipeCommentInDB = createAsyncThunk(
  "recipes/updateRecipeCommentInDB",
  async ({ id, user_comment }, { rejectWithValue }) => {
    console.log("recipe_info");
    console.log(id);
    console.log(user_comment);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .update({ user_comment })
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return { id, user_comment };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateRecipesWithImages = createAsyncThunk(
  "recipes/updateRecipesWithImages",
  async (_, { getState, rejectWithValue }) => {
    const { recipes } = getState().recipes;

    const recipesToUpdate = recipes.filter((recipe) => !recipe.image_link);
    console.log("recipesToUpdate");
    console.log(recipesToUpdate);

    try {
      const updatedRecipes = await Promise.all(
        recipesToUpdate.map(async (recipe) => {
          const imageUrl = await generateImageForRecipe(
            recipe.recipe_info.recipe_title
          );
          console.log("imageUrl");
          console.log(imageUrl);

          // Update the recipe in supabase
          const { data, error } = await supabase
            .from("recipes")
            .update({ image_link: imageUrl })
            .eq("id", recipe.id);

          if (error) {
            throw new Error(error.message);
          }

          return { ...recipe, image_link: imageUrl };
        })
      );

      return updatedRecipes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch shopping lists
export const fetchShoppingLists = createAsyncThunk(
  "recipes/fetchShoppingLists",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("shopping_list")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Save shopping list to the database
export const saveShoppingListToDB = createAsyncThunk(
  "recipes/saveShoppingListToDB",
  async ({ userId, list_name, ingredients }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("shopping_list")
        .insert([{ user_id: userId, list_name, ingredients }]);

      if (error) {
        throw new Error(error.message);
      }
      return data[0]; // return the inserted shopping list
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update shopping list comment
export const updateShoppingListCommentInDB = createAsyncThunk(
  "recipes/updateShoppingListCommentInDB",
  async ({ id, user_comment }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("shopping_list")
        .update({ user_comment })
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return { id, user_comment };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const defaultState = {
  recipes: [],
  shoppingLists: [],
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: defaultState,
  reducers: {
    addRecipesToStore(state, action) {
      state.recipes = [...action.payload, ...state.recipes];
    },
    removeRecipeFromStore(state, action) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    updateRecipeInStore(state, action) {
      const { recipeId, favorited } = action.payload;
      const recipe = state.recipes.find((recipe) => recipe.id === recipeId);
      if (recipe) {
        recipe.favorited = favorited;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveRecipesToDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveRecipesToDB.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure action.payload is an array before spreading
        if (Array.isArray(action.payload)) {
          state.recipes = [...state.recipes, ...action.payload];
        }
      })
      .addCase(saveRecipesToDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRecipeFromDB.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (recipe) => recipe.id !== action.payload
        );
      })
      .addCase(toggleFavoriteRecipeInDB.fulfilled, (state, action) => {
        const { recipeId, favorited } = action.payload;
        const recipe = state.recipes.find((recipe) => recipe.id === recipeId);
        if (recipe) {
          recipe.favorited = favorited;
        }
      })
      .addCase(toggleShoppingList.fulfilled, (state, action) => {
        const { action: toggleAction, list, id } = action.payload;
        if (toggleAction === "added") {
          state.shoppingLists.push(list);
        } else if (toggleAction === "removed") {
          state.shoppingLists = state.shoppingLists.filter(
            (list) => list.id !== id
          );
        }
      })
      .addCase(addShoppingList.fulfilled, (state, action) => {
        state.shoppingLists.push(action.payload);
      })
      .addCase(updateRecipeInDB.fulfilled, (state, action) => {
        const { id, recipe_info } = action.payload;
        const recipe = state.recipes.find((recipe) => recipe.id === id);
        if (recipe) {
          recipe.recipe_info = recipe_info;
        }
      })
      .addCase(updateRecipeCommentInDB.fulfilled, (state, action) => {
        const { id, user_comment } = action.payload;
        const recipe = state.recipes.find((recipe) => recipe.id === id);
        if (recipe) {
          recipe.user_comment = user_comment;
        }
      })
      .addCase(fetchShoppingLists.fulfilled, (state, action) => {
        state.shoppingLists = action.payload;
      })
      .addCase(saveShoppingListToDB.fulfilled, (state, action) => {
        state.shoppingLists.push(action.payload);
      });
  },
});

export const { addRecipesToStore, removeRecipeFromStore, updateRecipeInStore } =
  recipesSlice.actions;
export default recipesSlice.reducer;
