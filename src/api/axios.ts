import axios from 'axios'
import queryString from 'query-string'

export const baseURL = process.env.VUE_APP_API
export const domain = process.env.VUE_APP_SUB_DOMAIN
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept ': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
    indexes: false
  }
})
axiosClient.interceptors.request.use(async (config) => {
  return config
})
axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
