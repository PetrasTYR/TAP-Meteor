import axios from 'axios';

class Axios {
    constructor(baseURL, prefix = '') {
        // generate a new axios instance
        this.axios = axios.create({
            baseURL: `${baseURL}${prefix}`
        })
    }

    async httpGet(url, headers = {}, isExternalApi = false, options = {}) {
        return this.axios({
            method: 'get',
            url,
            // headers: this.getHeaders(headers, isExternalApi),
            options,
            // withCredentials: true
        })
    }

    async httpPost(url, headers, data) {
        return this.axios({
            method: 'post',
            url,
            // headers: this.getHeaders(headers),
            data,
            // withCredentials: true
        })
    }
}
export default Axios