import axiosClient, { platForm } from './axios'
import { Login, OrderParam, Organization, Product, Register, ResponseSuccess, Service, UpdateProfile, User } from '@/interfaces'
import API_URL from './apiUrl'
import { header, headerParam } from './configHeader'
import { pickBy, identity } from 'lodash'

class ApiClient {
  login = (body: Login): Promise<User> => {
    return axiosClient.post(API_URL.login, { ...body, platform: platForm }).then((res) => res.data.context)
  }

  profile = () => {
    return axiosClient.get(API_URL.profile, header()).then((res) => res.data.context)
  }
  register = (body: Register) => {
    return axiosClient.post(API_URL.register, body)
  }

  putProfile = (body: UpdateProfile) => {
    return axiosClient.put(API_URL.profile, pickBy(body, identity), header()).then((res) => res.data.context)
  }

  media = (media: FormData) => {
    return axiosClient.post(API_URL.media, media, header('multipart/form-data')).then((res) => res.data.context)
  }

  organizationsId = (): Promise<Organization> => {
    return axiosClient.get(API_URL.organizations).then((res) => res.data.context)
  }
  orders = (params: OrderParam) => {
    return axiosClient.get(API_URL.orders, headerParam(<OrderParam>params)).then((res) => res.data.context)
  }
  services = (): Promise<ResponseSuccess<Service[]>> => {
    return axiosClient.get(API_URL.services).then((res) => res.data.context)
  }
  service = (id: string | number): Promise<Service> => {
    return axiosClient.get(
      API_URL.service(id),
      headerParam({
        include: 'category|favorites_count',
        append: 'is_favorite|rating|bought_count'
      })
    )
      .then((res) => res.data.context)
  }
  products = (): Promise<ResponseSuccess<Product[]>> => {
    return axiosClient.get(API_URL.products).then((res) => res.data.context)
  }
  product = (id: number | string): Promise<Product> => {
    return axiosClient.get(
      API_URL.product(id),
      headerParam({
        include: 'category | favorites'
      })
    )
      .then((res) => res.data.context)
  }
}

const api = new ApiClient()
export default api
