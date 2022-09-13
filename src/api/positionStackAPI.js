import Axios from '../helpers/http'
import { POSITION_STACK_BASE_URL, VERSION_ONE_API_PREFIX } from '../constants'

const positionStack = new Axios(
    `${POSITION_STACK_BASE_URL}${VERSION_ONE_API_PREFIX}`
)

class positionStackAPI {
    static async reverseGeocodeStreetAddress(lat, lng) {
        return positionStack.httpGet(
            `reverse?access_key=${process.env.REACT_APP_POSITION_STACK_ACCESS_KEY}&query=${lat},${lng}&country=SG&limit=1`
        )
    }
}

export default positionStackAPI
