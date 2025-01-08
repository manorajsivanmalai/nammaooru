const express = require('express');
const userRouter = express.Router();
const { createPool } = require('@vercel/postgres');
const connectionString ="postgres://default:oQm2pSXI5ulY@ep-patient-rain-a4vsiaah-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";

const pool = createPool({
  connectionString: connectionString,
});

userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Parameterized query to prevent SQL injection
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      // If no users were found, return a 404
      return res.status(404).json({islogin:false});
    }

    // If a user is found, return the user data
    res.json({islogin:true});
  } catch (err) {
   // console.error(err.message);
    res.status(500).json({islogin:false});
  }
});

module.exports = { userRouter };
