var express = require('express');
var router = express.Router();
var fetcher = require('./fetcher')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const data = await fetcher.fetch(req.query.id, 15);
  res.render('layout', { body: `name, cost <br/>${Object.keys(data)[0]},${Object.values(data)[0]}` });
});


router.post('/', async function (req, res, next) {
  await fetcher.postCustomer(req.body.id, req.body.name, req.body.pd, req.body.fd);
  res.render('layout', { body: 'new user ${req.body.name} was added' });
});

module.exports = router;
