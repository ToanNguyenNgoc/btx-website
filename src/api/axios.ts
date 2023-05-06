import axios from 'axios'
import queryString from 'query-string'

export const baseURL = process.env.VUE_APP_API
export const domain = process.env.VUE_APP_SUB_DOMAIN
export const platForm = process.env.VUE_APP_SUB_PLAT_FORM
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
  const token = localStorage.getItem('app-tk')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response
    }
    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
