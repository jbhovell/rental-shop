var express = require('express');
var router = express.Router();
//TODO 
//save data in a json file or sqlite
const data = {
  // [id, rate( per/hour )]
  deviceLevels: [
    [0, 1.00],
    [1, 1.50],
    [2, 2.00],
    [3, 5.00],
  ],
  // [id, level]
  devices: [
    [0, 0],
    [1, 0],
    [2, 2],
    [3, 1],
    [4, 1],
  ],
  // [id, name, percentage discount (%), flat rate discount($)]
  customers: [
    [0, 'John', 15, 5],
    [1, 'Lea', 25, 20],
    [2, 'Sara', 5, 10],
    [3, 'Bob', 0, 50],
    [4, 'Eric', 10, 10],
  ],
  // [id, device, customers, hours]
  rentals: [
    [0, 1, [1, 0], 10],
    [1, 2, [2], 24],
    [2, 3, [3], 5],
    [3, 4, [2, 3], 48],
    [4, 1, [1, 0], 10],
    [5, 2, [1], 24],
    [6, 3, [3, 2], 5],
    [7, 4, [2, 3, 0], 48],
    [8, 0, [4], 10],
    [9, 0, [4], 15]
  ]
}
/* GET users listing. */
router.get('/cost', function (req, res, next) {
  const cost = calculateAmountsOwing(data, 15)
  res.send(cost);
});

router.get('/customers', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});

router.get('/devices', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});

router.get('/deviceslevels', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});

router.get('/rentals', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});


router.post('/customers', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});

router.post('/devices', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});

router.post('/deviceslevels', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});

router.post('/rentals', async function (req, res, next) {
  //todo
  //cors forbid?
  //display in a table?
  const data = (await axios.get('http://localhost:3001/api')).data
  res.status(200).json(data);
});

const calculateAmountsOwing = (data, minimumCharge = 0) => {
  deviceLevels = data.deviceLevels
  devices = data.devices
  rentals = data.rentals
  customers = data.customers
  cost = {}
  //find the total cost of each customer
  for (r of rentals) {
    [id, dev, cus, h] = r
    //find dev level by id
    devLevel = devices.find(d => d[0] === dev)[1]
    //find rate for device level
    rate = deviceLevels.find(dl => dl[0] === devLevel)[1]
    sum = rate * h
    sum = sum / cus.length
    for (c of cus) {
      cost[c] = sum + (cost[c] || 0)
    }
  }
  //apply discount, flat dis and minimal to each customer in cost, round 2 digits
  disCost = {}
  Object.keys(cost).forEach(k => {
    cus = customers.find(c => c[0] == k)
    total = cost[k] * (100 - cus[2]) / 100 - cus[3]
    disCost[cus[1]] = +(Math.max(total, minimumCharge)).toFixed(2)
  })
  return disCost
}
module.exports = router;
