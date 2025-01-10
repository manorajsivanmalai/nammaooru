
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

router.get("/",async (req,res)=>{
   
    try {
// Option 1: Passing a connection URI
const sequelize = new Sequelize("postgres://default:oQm2pSXI5ulY@ep-patient-rain-a4vsiaah-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require") 


    await sequelize.authenticate();
    res.json('Connection has been established successfully.');
  } catch (error) {
    res.json('Unable to connect to the database:', error);
  }
// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

})


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