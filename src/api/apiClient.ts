import axiosClient from './axios'
import { Login, UpdateProfile } from '@/interfaces'
import API_URL from './apiUrl'
import { header } from './configHeader'
import { pickBy, identity } from 'lodash'

class ApiClient {
  login = (body: Login) => {
    return axiosClient.post(API_URL.login, body).then((res:any) => res.data.context)
  }

  profile = () => {
    return axiosClient.get(API_URL.profile, header()).then((res:any) => res.data.context)
  }

  putProfile = (body: UpdateProfile) => {
    return axiosClient.put(API_URL.profile, pickBy(body, identity), header()).then((res:any) => res.data.context)
  }

  media = (media: FormData) => {
    console.log(media)
    return axiosClient.post(API_URL.media, media, header('multipart/form-data')).then((res:any) => res.data.context)
  }

  organizationsId = () => {
    return axiosClient.get(API_URL.organizations).then((res:any) => res.data.context)
  }
}

const api = new ApiClient()
export default api
