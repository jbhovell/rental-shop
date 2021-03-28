
const axios = require('axios')
const URL = 'http://localhost:3001/users';

// pass params in the command
// id, customer name, min charge can be commands line argus
//write to csv file

const fetch = async (id, minimumCharge) => {
    console.log(id);
    const userId = id;
    console.log(minimumCharge);
    const resp = await axios.get('http://localhost:3001/users');
    return calCost(resp.data, +minimumCharge, id);
};

const calCost = (data, minimumCharge, userId) => {
    console.log(data);
    const deviceLevels = data.devicelevels
    const devices = data.devices
    const rentals = data.rentals
    const customers = data.customers
    let cost = {}
    //find the total cost of each customer
    for (const r of rentals) {
        const [id, dev, cus, h] = r
        //find dev level by id
        const devLevel = devices.find(d => d[0] === dev)[1]
        //find rate for device level
        const rate = deviceLevels.find(dl => dl[0] === devLevel)[1]
        let sum = rate * h
        sum = sum / cus.length
        for (const c of cus) {
            cost[c] = sum + (cost[c] || 0)
        }
    }
    //apply discount, flat dis and minimal to each customer in cost, round 2 digits
    let disCost = {}
    Object.keys(cost).forEach(k => {
        const cus = customers.find(c => c[0] == k)
        const total = cost[k] * (100 - cus[2]) / 100 - cus[3]
        disCost[cus[1]] = Math.round(Math.max(total, minimumCharge) * 100) / 100
    })
    console.log(disCost);
    return disCost
}

fetch(process.argv[2], process.argv[3]).then(data => console.log(data));
module.exports = { fetch, URL, calCost }