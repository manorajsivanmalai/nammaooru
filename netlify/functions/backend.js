
const express = require('express');
const cors = require('cors');
const router = express.Router();
const serverless = require('serverless-http');
const { createMember, getMembers } = require('../controller/MemberController');
const {createExpenses,getExpenses} = require('../controller/ExpensesController');
const {userRouter} =require("../controller/UserController");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

router.get("/",(req,res)=>{res.json("server is running")})


//member Routers
router.post("/createmember",createMember);
router.get("/getmembers",getMembers);

//expenses router
router.post("/addexpense",createExpenses);
router.get("/getexpenses",getExpenses);


app.use('/api/', router);
app.use("/api/",userRouter);



module.exports.handler = serverless(app);