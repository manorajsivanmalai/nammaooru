require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
// Initialize the Sequelize connection
const sequelize = new Sequelize("postgres://default:oQm2pSXI5ulY@ep-patient-rain-a4vsiaah-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require", {
  dialect: 'postgres',
  logging: false, // Disable logging for clean output
});

// Define the model
const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically generate the id
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'category', // Default value for category
  },
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Member table has been created!'))
  .catch((error) => console.error('Error syncing the model:', error));

module.exports = Member;
