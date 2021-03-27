const Customers = require('../models/customers');
const { Op } = require('sequelize');


const post = async (data) => {
    const { user, description, date } = data;
    console.log(user)
    console.log(date)
    console.log(description)
    // Customer.sync({ force: true }).then(() => {
    //     // Table created
    //     return Customer.create({
    //         name: 'jianfang'
    //     });
    // });

    await Customers.create({
        name
    });
}

const get = async (id, name) => {
    if (id)
        return await Customers.findByPk(id)
    else if (name)
        return await Customers.findAll({
            attributes: ['name'],
            where: {
                name: name
            }
        });
    else
        return await Customers.findAll({
            attributes: ['id', 'name']
        });
}

module.exports = { post, get }