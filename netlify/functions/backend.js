
const express = require('express');
const cors = require('cors');
const router = express.Router();
require('dotenv').config();
const serverless = require('serverless-http');
  const { createMember, getMembers,updateMember,deleteMember } = require('../controller/MemberController');
// const {createExpenses,getExpenses,updateExpenses, deleteExpenses} = require('../controller/ExpensesController');
 const {userRouter} =require("../controller/UserController");
 const { AppDataSource } = require('../model/dbconnect/data-source');
 const Members = require('../model/Membertable');
const app = express();
app.use(express.json());
app.use(cors());


  router.get('/', async (req, res) => {
  
    try {
        const memberRepository = AppDataSource.getRepository(Members);  // Get repository of Member entity
        const members = await memberRepository.find();  // Retr // Query directly by table name
        res.status(200).json(members);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve members by table name' });
      }
 
  });





//member Routers
router.post("/createmember",createMember);
router.get("/getmembers",getMembers);
router.put("/member/:id",updateMember);
router.delete("/member/:id",deleteMember);

// //expenses router
// router.post("/addexpense",createExpenses);
// router.get("/getexpenses",getExpenses);
// router.put("/expense/:id",updateExpenses);
// router.delete("/expense/:id",deleteExpenses)




app.use('/api/', router);
app.use("/api/",userRouter);



module.exports.handler = serverless(app);