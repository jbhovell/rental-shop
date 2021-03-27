var express = require('express');
var router = express.Router();
const { post, get } = require('../controllers/customers');
/* GET users listing. */

router.post('/', (req, res, next) => {
    const data = {
        name: req.body.name
    };
    post(data);
    res.status(201).send(data);
});
router.get('/', async function (req, res, next) {
    let data;
    if (req.query.name)
        data = await get(rnull, eq.query.name)
    else
        data = await get();
    if (!data)
        res.status(404).send('no records found')
    else {
        res.status(200)
        const rems = data.sort((r1, r2) => r1.id - r2.id).map(r => {
            delete r.id
            return r
        });
        console.log(rems)
        res.send(rems);
    }
});

router.get('/:id', async function (req, res, next) {
    const data = await get(req.params.id, null)
    if (data)
        res.status(200).send(data);
    else
        res.status(404).send('ID not found')
});

router.put('/:id', function (req, res, next) {
    res.status(405).send();
});

router.patch('/:id', function (req, res, next) {
    res.status(405).send();
});

router.delete('/:id', function (req, res, next) {
    res.status(405);
    res.send('delete is not allowed')
});


module.exports = router;
