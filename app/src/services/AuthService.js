import Service from './Service';

class AuthService extends Service {
    constructor () {
        super('http://localhost/api/auth', localStorage.getItem('authorization'));
    }

    login(credentials) {
        return this
            .axios
            .post('/login', credentials)
            .then(response => {
                localStorage.setItem('authorization', 'Bearer ' + response.data.access_token);
            });
    }

    logout() {
        return this
            .axios
            .post('/logout')
            .then(() => {
                localStorage.removeItem('authorization');
            });
    }

}

export default new AuthService();
