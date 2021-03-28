var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await fetch());
});

const fetch = async () => {
  const resp = await axios.get('http://localhost:3001/users');
  return resp.data
}
module.exports = router;
