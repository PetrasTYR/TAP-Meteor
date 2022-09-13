import axios from 'axios'

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
            options
        })
    }

    async httpPost(url, headers, data) {
        return this.axios({
            method: 'post',
            url,
            data
        })
    }
}
export default Axios
