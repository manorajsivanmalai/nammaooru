
const express = require('express');
const cors = require('cors');
const router = express.Router();
require('dotenv').config();
const serverless = require('serverless-http');
//  const { createMember, getMembers,updateMember,deleteMember } = require('../controller/MemberController');
// const {createExpenses,getExpenses,updateExpenses, deleteExpenses} = require('../controller/ExpensesController');
 const {userRouter} =require("../controller/UserController");
 const { Sequelize } = require('sequelize');
const app = express();
app.use(express.json());
app.use(cors());


  router.get('/', async (req, res) => {
    try {
        const sequelize = new Sequelize('verceldb', 'default', 'oQm2pSXI5ulY', {
        host: 'ep-patient-rain-a4vsiaah-pooler.us-east-1.aws.neon.tech',
        dialect: 'postgres'
        });
      await sequelize.authenticate();
      res.status(200).send('Database connected successfully');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      res.status(500).send('Unable to connect to the database');
    }
  });
// Option 3: Passing parameters separately (other dialects)





//member Routers
// router.post("/createmember",createMember);
// router.get("/getmembers",getMembers);
// router.put("/member/:id",updateMember);
// router.delete("/member/:id",deleteMember);

// //expenses router
// router.post("/addexpense",createExpenses);
// router.get("/getexpenses",getExpenses);
// router.put("/expense/:id",updateExpenses);
// router.delete("/expense/:id",deleteExpenses)




app.use('/api/', router);
app.use("/api/",userRouter);



module.exports.handler = serverless(app);