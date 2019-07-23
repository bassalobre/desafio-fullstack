import Service from './Service';

class ViaCepService extends Service {
    constructor () {
        super('https://viacep.com.br/ws/');
    }

    addressByCep(cep) {
        return this.axios.get(cep + '/json');
    }
}

export default ViaCepService;
