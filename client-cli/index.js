
const axios = require('axios')
const URL = 'http://localhost:3001/users';
const fetch = async () => {
    const resp = await axios.get('http://localhost:3001/users');
    return resp.data;
};

module.exports = { fetch, URL}