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

	editUser(user) {
		return this.axios.put('/users/' + user.id, user);
	}

	createUser(user) {
		return this.axios.post('/users', user);
	}

	destroyUser(id) {
		return this.axios.delete('/users/' + id);
	}
}

export default UserService;
