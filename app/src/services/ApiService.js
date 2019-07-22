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

	users() {
		return this.axios.get('/users');
	}

	user(id) {
		return this.axios.get('/users/' + id);
	}
}

export default new ApiService();
