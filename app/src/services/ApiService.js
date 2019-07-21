const axios = require('axios');

class ApiService {
	constructor () {
		this.axios = axios.create({
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			baseURL: 'http://localhost/api',
			timeout: 60000,
		});
	}

	test() {
		return this.axios.get('/test');
	}
}

export default new ApiService();
