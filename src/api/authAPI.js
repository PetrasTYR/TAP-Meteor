import Axios from '../helpers/http';
import { ONE_MAP_BASE_URL } from '../constants';

const oneMap = new Axios(`${ONE_MAP_BASE_URL}/`)

class authAPI {
    static async getAccessToken() {
        return oneMap.httpPost('auth/post/getToken', {}, {
            "email": process.env.ONE_MAP_EMAIL,
            "password": process.env.ONE_MAP_PASSWORD
        });
    }
}

export default authAPI;