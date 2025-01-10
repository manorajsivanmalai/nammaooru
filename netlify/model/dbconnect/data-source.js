
require("reflect-metadata");
const { DataSource } = require('typeorm');
const Members = require('../../model/Membertable'); 
const Expenses=require("../../model/Expensestable")
const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: true,   
  logging: false,
  entities: [Members,Expenses],  
});

let isInitialized = false;
async function initializeDataSource() {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      isInitialized = true;
      console.log('DataSource initialized successfully');
    } catch (error) {
      console.log('Error during DataSource initialization:', error);
    }
  }
}

module.exports = { AppDataSource, initializeDataSource };