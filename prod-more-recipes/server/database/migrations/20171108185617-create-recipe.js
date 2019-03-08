module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        //  be seeing id in users table as userId
        key: 'id',
      },
    },
    procedure: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ingredients: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    upvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    noviews: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Recipes'),
};
