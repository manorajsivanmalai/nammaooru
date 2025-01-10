const { DataSource } = require('typeorm');
const Members = require('../../model/Membertable'); 
const Expenses=require("../../model/Expensestable")
const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: false,   
  logging: false,
  entities: [Members,Expenses],  
});

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource initialized successfully');
  })
  .catch(error => console.log('Error during DataSource initialization:', error));

module.exports = { AppDataSource };
