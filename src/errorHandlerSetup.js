import axios from 'axios'
import errorHandler from './utilities/errorHandler'

export default function errorHandlerSetup(options){
    // In your HTTP client configuration (e.g., Axios)
    axios.interceptors.response.use(null, (error) => {
        // Handle the error with errorHandler
        console.log('interceptor', error)
        return errorHandler(error, options)
    })
}