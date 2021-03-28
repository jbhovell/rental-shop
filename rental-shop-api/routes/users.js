var express = require('express');
var router = express.Router();

const data = {
  // [id, rate( per/hour )]
  devicelevels: [
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
// on servers data to authencated users
router.get('/', function (req, res, next) {
  res.status(200).json(data);
});

router.get('/devicelevels', (req, res, next) => {
  res.status(200).json(data.devicelevels);
});

router.get('/devices', function (req, res, next) {
  res.status(200).json(data.devices);
});

router.get('/customers', function (req, res, next) {
  res.status(200).json(data.customers);
});

router.get('/rentals', function (req, res, next) {
  res.status(200).json(data.rentals);
})

module.exports = router;
