var express = require('express');
var router = express.Router();
const axios = require('axios')
/* GET users listing. */
router.get('/view', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table? frontend stuff
  // call api's endpoints (all?) then call calculate?
  let data = (await axios.get('http://localhost:3001/api/cost')).data
    if (req.query.user) {
      let userData = {}
      userData[req.query.user] = data[req.query.user]
      data = userData
    }
    res.status(200).json(data);
});

//TODO

router.post('/', () => {
 //axios.post? all?
})
module.exports = router;
