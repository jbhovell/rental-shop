var express = require('express');
var router = express.Router();
const axios = require('axios')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  //cors forbid?
  //display in a table? pug front end
  let data = (await axios.get('http://localhost:3001/api/cost')).data
  if (req.query.user) {
    let userData = {}
    userData[req.query.user] = data[req.query.user]
    data = userData
  }
  res.status(200).json(data);
});

router.post('/', () => {
})

router.post('/customers', () => {

})
module.exports = router;
