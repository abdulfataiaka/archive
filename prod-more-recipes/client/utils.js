
export const splitIngredients = (ingredients) => {
  if (typeof ingredients !== 'string' || ingredients.length <= 0) return [];
  return ingredients.split(',');
};

export const joinIngredients = (ingredients) => {
  let joined = '';
  if (Array.isArray(ingredients)) {
    ingredients.map((ingredient, index) => {
      if (typeof ingredient === 'string') {
        joined = (
          index === 0
            ? `${ingredient.trim()}`
            : `${ingredient.trim()}, ${joined}`
        );
      }
    });
  }
  return joined;
};

const getCategory = (categories, categoryId) => {
  if (
    !Number.isInteger(parseInt(categoryId, 10))
  ) return null;

  const result = categories.filter((category) => {
    if (Object.keys(category).includes('id')) {
      return `${category.id}` === `${categoryId}`;
    } return false;
  });
  return result.length === 1 ? result[0] : null;
};

export const separateIntoCategories = (favorites, categories) => {
  const resolvedFavorites = { general: [] };
  if (
    !Array.isArray(favorites)
    || !Array.isArray(categories)
  ) return resolvedFavorites;

  favorites.map((favorite) => {
    const favoriteCopy = favorite;
    const { categoryId } = favoriteCopy;
    const category = getCategory(categories, categoryId);
    let categoryName;

    if (category === null || !('name' in category)) {
      categoryName = 'general';
      favoriteCopy.categoryId = null;
    } else { categoryName = category.name; }

    if (favoriteCopy.Recipe) {
      if (Array.isArray(resolvedFavorites[categoryName])) {
        resolvedFavorites[categoryName].push(favoriteCopy);
      } else {
        resolvedFavorites[categoryName] = [favoriteCopy];
      }
    }
    return null;
  });
  return resolvedFavorites;
};

export const resolveStatusCode = (code, def = '') => {
  switch (code) {
    case 504:
      return 'Server seems to be down';
    default:
      return def;
  }
};

export const isValidPreviewImage = file => (
  file !== null
  && [
    'image/png',
    'image/jpg',
    'image/jpeg',
  ].includes(file.type)
);

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export default {
  splitIngredients,
  resolveStatusCode,
  capitalize,
  separateIntoCategories,
  isValidPreviewImage,
};
