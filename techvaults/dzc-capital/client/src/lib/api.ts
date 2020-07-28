import axios from 'axios';
import Client from './client';

const CONTENT_TYPE = 'application/json';

type ConfigType = {
    [index: string]: boolean
};

class Config {
    static make({ token = true, json = true }: ConfigType) {
        const headers = {};
        const baseURL: string = process.env.API_BASE_URL;

        if(token) headers['Token'] = Client.getToken();
        if(json) headers['Content-Type'] = CONTENT_TYPE;

        return { baseURL, headers };
    }
}

class Api {
    static get(path, config: ConfigType = {}) {
        return axios.get(path, Config.make(config));
    }

    static post(path, body, config: ConfigType = {}) {
        return axios.post(path, body, Config.make(config));
    }

    static put(path, body, config: ConfigType = {}) {
        return axios.post(path, body, Config.make(config));
    }

    static patch(path, body, config: ConfigType = {}) {
        return axios.post(path, body, Config.make(config));
    }

    static delete(path, body, config: ConfigType = {}) {
        return axios.post(path, body, Config.make(config));
    }
}

export default Api;
