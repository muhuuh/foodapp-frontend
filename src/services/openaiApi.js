// services/openaiApi.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

//----------------------- create recipes --------------

export const getRecipeFromAI = async (
  userInput,
  additionalOptions,
  file,
  ingredients
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: generatePrompt(
            userInput,
            additionalOptions,
            file,
            ingredients
          ),
        },
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });

    const result = response.choices[0].message.content.trim();
    const recipes = parseResult(result);

    return recipes;
  } catch (error) {
    console.error("Error fetching recipe from OpenAI:", error);
    throw error;
  }
};

const generatePrompt = (userInput, additionalOptions, file, ingredients) => {
  let optionsString = additionalOptions.join(", ");
  let ingredientsString = ingredients
    .map((item) => `${item.ingredient}: ${item.quantity}`)
    .join(", ");
  let fileString = file
    ? `Ein Bild des Gerichts ist auch vorhanden: ${file}`
    : `Es wurde kein Bild des Gerichts bereitgestellt.`;

  return `Der Benutzer möchte folgendes essen: ${userInput}. Zusätzliche wichtige Details und Klarstellungen zum Rezept die befolgt werden müssen: ${optionsString}. Folgende Zutaten müssen im Rezept drin sein (Mengen versuchen zu treffen): ${ingredientsString}. ${fileString}. 
  Bitte geben Sie 2 kreative Rezepte im strengen JSON-Format mit der folgenden Struktur zurück: [{"recipe_title": "Titel des Rezepts", "ingredients": "Liste der Zutaten mit Mengen, Komma getrennt", "instructions": "Schritt-für-Schritt-Anweisungen als numerische aufzählung"}]. Geben Sie nur die JSON-Antwort zurück, ohne zusätzlichen Text. Beispielantwort: [{"recipe_title": "Spaghetti Bolognese", "ingredients": "Spaghetti: 200g, Hackfleisch:100g, Tomatensauce: 250ml, Zwiebeln: 1Stk, Knoblauch: 10g", "instructions": "1. Spaghetti kochen. 2. Die Sauce zubereiten. 3. Mischen und servieren."}].`;
};

const parseResult = (result) => {
  try {
    const jsonString = result.match(/\[.*\]/s)?.[0]; // Extract the JSON part of the string
    if (!jsonString) {
      throw new Error("No JSON found in the response");
    }
    const parsedResult = JSON.parse(jsonString);
    return parsedResult.map((recipe) => ({
      recipe_title: recipe.recipe_title || "Kein Titel angegeben",
      ingredients: recipe.ingredients || "Keine Zutaten angegeben",
      instructions: recipe.instructions || "Keine Anweisungen angegeben",
    }));
  } catch (error) {
    console.error("Error parsing JSON result from OpenAI:", error);
    return [
      {
        recipe_title: "Fehler",
        ingredients: "Zutaten konnten nicht analysiert werden.",
        instructions: "Anweisungen konnten nicht analysiert werden.",
      },
    ];
  }
};

// ----------- modify recipes --------------------

export const modifyRecipeWithAI = async ({ recipe, modificationText }) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: generateModificationPrompt(recipe, modificationText),
        },
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });

    const result = response.choices[0].message.content.trim();
    const modifiedRecipe = parseModifyResult(result)[0];

    return modifiedRecipe;
  } catch (error) {
    console.error("Error modifying recipe with OpenAI:", error);
    throw error;
  }
};

const generateModificationPrompt = (recipe, modificationText) => {
  return `Der Benutzer möchte das folgende Rezept ändern: 
  Titel: ${recipe.recipe_info.recipe_title}
  Zutaten: ${recipe.recipe_info.ingredients}
  Anweisungen: ${recipe.recipe_info.instructions}

  Änderungsanweisungen: ${modificationText}

  Bitte geben Sie das aktualisierte Rezept im strengen JSON-Format mit der folgenden Struktur zurück: 
  {
    "recipe_title": "Titel des Rezepts", 
    "ingredients": "Liste der Zutaten mit Komma getrennt", 
    "instructions": "Schritt-für-Schritt-Anweisungen"
  }. Geben Sie nur die JSON-Antwort zurück, ohne zusätzlichen Text.`;
};

const parseModifyResult = (result) => {
  try {
    const jsonString = result.match(/\{.*\}/s)?.[0]; // Extract the JSON part of the string
    if (!jsonString) {
      throw new Error("No JSON found in the response");
    }
    const parsedResult = JSON.parse(jsonString);
    return [
      {
        recipe_title: parsedResult.recipe_title || "Kein Titel angegeben",
        ingredients: parsedResult.ingredients || "Keine Zutaten angegeben",
        instructions:
          parsedResult.instructions || "Keine Anweisungen angegeben",
      },
    ];
  } catch (error) {
    console.error("Error parsing JSON result from OpenAI:", error);
    return [
      {
        recipe_title: "Fehler",
        ingredients: "Zutaten konnten nicht analysiert werden.",
        instructions: "Anweisungen konnten nicht analysiert werden.",
      },
    ];
  }
};

//-------------------------- generate images ------------------
export const generateImageForRecipe = async (recipeTitle) => {
  console.log("generateImageForRecipe");
  console.log(generateImageForRecipe);
  try {
    const response = await openai.images.generate({
      prompt: `A modern, appetizing, and professional-looking dish of ${recipeTitle}`,
      n: 1,
      size: "512x512",
    });

    console.log("response");
    console.log(response);

    const imageUrl = response.data[0].url;

    console.log("imageUrl");
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error generating image from OpenAI:", error);
    throw error;
  }
};

//--------------------- Search ----------------------------

export const getSearchResultsFromAI = async (
  userInput,
  searchType,
  file,
  ingredients
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: generatePromptSearch(
            userInput,
            searchType,
            file,
            ingredients
          ),
        },
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });
    console.log("response.choices[0]");
    console.log(response.choices[0]);
    const result = response.choices[0].message.content.trim();
    const searchResults = parseModifyResultSearch(result)[0]; // Using parseModifyResult

    return searchResults;
  } catch (error) {
    console.error("Error fetching search results from OpenAI:", error);
    throw error;
  }
};

const generatePromptSearch = (userInput, searchType, file, ingredients) => {
  let ingredientsString = ingredients.join(", ");
  let fileString = file
    ? `Ein Bild des Artikels ist auch vorhanden: ${file.name}`
    : `Es wurde kein Bild des Artikels bereitgestellt.`;

  return `Der Benutzer sucht nach zutaten um etwas zu kochen. Beschreibung: ${userInput}. Ausgewählte Zutaten: ${ingredientsString}. ${fileString}. 
  Bitte geben Sie eine JSON-Antwort im strengen JSON-Format mit der folgenden Struktur zurück: {"ingredients": [], "keywords": [], "explanation": ""}. In explantion sollte in 2-3 Sätze erklärt werden wieso diese Antwort ausgewählt worden ist. Es soll den User Kontext zum Ergbeniss der Suche geben`;
};

const parseModifyResultSearch = (result) => {
  try {
    const jsonString = result.match(/\{.*\}/s)?.[0]; // Extract the JSON part of the string
    if (!jsonString) {
      throw new Error("No JSON found in the response");
    }
    const parsedResult = JSON.parse(jsonString);
    return [
      {
        ingredients: parsedResult.ingredients || "Keine Zutaten angegeben",
        keywords: parsedResult.keywords || [],
        explanation: parsedResult.explanation || "",
      },
    ];
  } catch (error) {
    console.error("Error parsing JSON result from OpenAI:", error);
    return [
      {
        ingredients: "Zutaten konnten nicht analysiert werden.",
        keywords: [],
        explanation: "Erklärung konnte nicht analysiert werden.",
      },
    ];
  }
};
