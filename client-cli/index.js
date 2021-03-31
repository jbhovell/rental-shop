
const axios = require('axios')
const URL = 'http://localhost:3001/users';
const fs = require('fs');


// cache result in csv, cookie or local storage

//axios all for multi queries

const fetch = async (id, minimumCharge) => {
    console.log(id);
    const userId = id;
    console.log(minimumCharge);
    try {
        if (id < 0 || minimumCharge < 0)
            throw new Error('id or minimum charge can not be negative');
        const resp = await axios.get(`http://localhost:3001/users/${userId}`);
        const cost = calCost(resp.data, +minimumCharge, id);
        writeToCSV(userId, cost);
        writeToText(cost);
        return cost;
    }
    catch (e) {
        console.log(e.message);
        throw e;
    }
};

const calCost = (data, minimumCharge) => {
    if (!data)
        throw new Error('data is null');
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
        if (cus) {
            const total = cost[k] * (100 - cus[2]) / 100 - cus[3]
            disCost[cus[1]] = Math.round(Math.max(total, minimumCharge) * 100) / 100
        }
    })
    console.log(disCost);
    return disCost
}

const writeToCSV = (id, data) => {
    let str = 'id, name, cost \n' + id + ',';
    Object.keys(data).forEach(f => str += f + ',' + data[f] + '\n')

    fs.writeFileSync('./output.csv', str);
}

const writeToText = (data) => {

    fs.writeFileSync('./output.txt', JSON.stringify(data));
}
fetch(process.argv[2], process.argv[3]).then(data => console.log(data));
module.exports = { fetch, URL, calCost }