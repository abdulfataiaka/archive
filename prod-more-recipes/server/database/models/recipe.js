module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    //  needed for association with users
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    procedure: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    noviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });

  //  defining the associations for recipes model

  //  association with a user
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'Owner',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'Reviews',
    });
  };
  return Recipe;
};
