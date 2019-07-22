const axios = require('axios');

class ViaCepService {
    constructor () {
        this.axios = axios.create({
            baseURL: 'https://viacep.com.br/ws/',
            timeout: 60000,
        });
    }

    address(cep) {
        return this.axios.get(cep + '/json');
    }
}

export default new ViaCepService();
