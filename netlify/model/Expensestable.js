const { Sequelize, DataTypes } = require('sequelize');

// Initialize the Sequelize connection
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging for clean output
});

// Define the model
const Expenses = sequelize.define('Expenses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically generate the id
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Expenses table has been created!'))
  .catch((error) => console.error('Error syncing the model:', error));

module.exports = Expenses;
