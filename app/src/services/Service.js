const axios = require('axios');

class Service {
    constructor (baseURL, authorization = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (authorization) headers['Authorization'] = authorization;

        this.axios = axios.create({
            headers,
            baseURL,
            timeout: 60000,
        });
    }
}

export default Service;
