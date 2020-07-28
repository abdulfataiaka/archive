class Client {
    static push(path) {
        window.location.assign(path);
    }

    static setToken(token) {
        document.cookie = `token=${token}`;
    }

    static getToken() {
        const item = document.cookie.split(';')
            .find(item => item.trim().startsWith('token='));

        return item ? item.split('=')[1].trim() : '';
    }

    static setEmail(email) {
        window.localStorage.setItem('email', email);
    }

    static getEmail() {
        return window.localStorage.getItem('email');
    }
}

export default Client;
