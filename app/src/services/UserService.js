import Service from './Service';

class UserService extends Service {
	constructor () {
		super('http://localhost/api', localStorage.getItem('authorization'));
	}

	usersList() {
		return this.axios.get('/users');
	}

	userById(id) {
		return this.axios.get('/users/' + id);
	}
}

export default new UserService();
