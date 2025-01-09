
const express = require('express');
const cors = require('cors');
const router = express.Router();
const serverless = require('serverless-http');
// const { createMember, getMembers,updateMember,deleteMember } = require('../controller/MemberController');
// const {createExpenses,getExpenses,updateExpenses, deleteExpenses} = require('../controller/ExpensesController');
// const {userRouter} =require("../controller/UserController");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

router.get("/",(req,res)=>{res.json("server is running")})


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
// app.use("/api/",userRouter);



module.exports.handler = serverless(app);