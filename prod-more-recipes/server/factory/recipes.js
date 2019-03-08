
const newRecipeSchema = {
  title: 'New recipe 1',
  ingredients: 'Ing1, Ing2',
  procedure: 'This describes how you prepare this recipe',
  recipeImageFile: null,
};

export const newRecipe = (update) => {
  let recipe = { ...newRecipeSchema };
  if (update && typeof update === 'object') {
    recipe = { ...recipe, ...update };
  }
  return recipe;
};

export default {
  newRecipe,
};
