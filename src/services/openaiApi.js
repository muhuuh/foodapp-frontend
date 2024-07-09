// services/openaiApi.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getRecipeFromAI = async (
  userInput,
  additionalOptions,
  file,
  ingredients
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
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
  Bitte geben Sie 3 Rezepte im strengen JSON-Format mit der folgenden Struktur zurück: [{"recipe_title": "Titel des Rezepts", "ingredients": "Liste der Zutaten", "instructions": "Schritt-für-Schritt-Anweisungen"}]. Geben Sie nur die JSON-Antwort zurück, ohne zusätzlichen Text. Beispielantwort: [{"recipe_title": "Spaghetti Bolognese", "ingredients": "Spaghetti, Hackfleisch, Tomatensauce, Zwiebeln, Knoblauch", "instructions": "1. Spaghetti kochen. 2. Die Sauce zubereiten. 3. Mischen und servieren."}].`;
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
