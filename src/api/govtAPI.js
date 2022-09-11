import Axios from '../helpers/http'
import { DATA_GOV_BASE_URL, VERSION_ONE_API_PREFIX } from '../constants'

const dataGov = new Axios(`${DATA_GOV_BASE_URL}/${VERSION_ONE_API_PREFIX}/`)

class govtAPI {
    static async getTrafficImage(dateTime) {
        return dataGov.httpGet(`transport/traffic-images?date_time=${dateTime}`)
    }

    static async getTwoHourWeather(dateTime) {
        return dataGov.httpGet(
            `/environment/2-hour-weather-forecast?date_time=${dateTime}`
        )
    }
}

export default govtAPI
