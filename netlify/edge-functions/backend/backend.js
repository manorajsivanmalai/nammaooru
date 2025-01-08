const express = require('express');
const app = express();
const router = express.Router();



router.get('/', (req, res) => {
  res.send("welcome to svmrockers");
});

// app.listen(4000, () => {
//   console.log("listening on port 4000");
// });






app.use('/.netlify/functions/app', router);

module.exports.handler = serverless(app);
