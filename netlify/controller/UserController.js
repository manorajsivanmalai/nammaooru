const express = require('express');
const userRouter = express.Router();
const { createPool } = require('@vercel/postgres');
const connectionString =process.env.POSTGRES_URL;

const pool = createPool({
  connectionString: connectionString,
});

userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({islogin:false,msg:"wrong username or password"});
    }

    res.json({islogin:true,msg:"login success"});
  } catch (err) {
    res.status(500).json({islogin:false,msg:"wrong username or password"});
  }
});


module.exports = { userRouter };
