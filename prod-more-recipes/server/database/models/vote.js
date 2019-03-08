
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Vote;
};
