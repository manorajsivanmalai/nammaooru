const { DataSource } = require('typeorm');
const Members = require('../../model/Membertable');  // Correct path to your entity file

const AppDataSource = new DataSource({
  type: 'postgres',
  url: "postgres://default:oQm2pSXI5ulY@ep-patient-rain-a4vsiaah-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",  // Ensure correct connection URL
  synchronize: false,  // Set to false in production, use migrations for prod
  logging: false,
  entities: [Members],  // Add the entity here
});

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource initialized successfully');
    // Your application logic here
  })
  .catch(error => console.log('Error during DataSource initialization:', error));

module.exports = { AppDataSource };
