
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Recipe, {
      // key to connect to in Recipe
      //  correct
      foreignKey: 'recipeId',
      as: 'Recipe',
      onDelete: 'CASCADE',
    });
  };

  return Favorite;
};
