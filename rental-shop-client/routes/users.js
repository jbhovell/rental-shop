var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
const url = 'http://localhost:3001/users'
router.get('/', async function (req, res, next) {
  const data = await fetchApi(url)
  res.render('layout', { cost: JSON.stringify(data) });
});

const fetchApi = async url => {
  const resp = await axios(url)
  console.log(resp.data);
  return resp.data
}
module.exports = { router, fetchApi };
