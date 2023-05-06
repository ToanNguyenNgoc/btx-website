import axiosClient, { platForm } from './axios'
import { Login, OrderParam, Organization, Product, Register, ResponseSuccess, Service, UpdateProfile, User } from '@/interfaces'
import API_URL from './apiUrl'
import { pickBy, identity } from 'lodash'

class ApiClient {
  login = (body: Login): Promise<User> => {
    return axiosClient.post(API_URL.login, { ...body, platform: platForm }).then((res) => res.data.context)
  }

  profile = () => {
    return axiosClient.get(API_URL.profile).then((res) => res.data.context)
  }
  register = (body: Register) => {
    return axiosClient.post(API_URL.register, body)
  }

  putProfile = (body: UpdateProfile) => {
    return axiosClient.put(API_URL.profile, pickBy(body, identity)).then((res) => res.data.context)
  }

  media = (media: FormData) => {
    return axiosClient.post(API_URL.media, media).then((res) => res.data.context)
  }

  organizationsId = (): Promise<Organization> => {
    return axiosClient.get(API_URL.organizations).then((res) => res.data.context)
  }
  orders = (params: OrderParam) => {
    return axiosClient.get(API_URL.orders, { params }).then((res) => res.data.context)
  }
  services = (): Promise<ResponseSuccess<Service[]>> => {
    return axiosClient.get(API_URL.services).then((res) => res.data.context)
  }
  service = (id: string | number): Promise<Service> => {
    const params = {
      include: 'category|favorites_count',
      append: 'is_favorite|rating|bought_count'
    }
    return axiosClient.get(
      API_URL.service(id),
      { params }
    )
      .then((res) => ({
        ...res.data.context,
        price: parseInt(res.data.context.price),
        special_price: parseInt(res.data.context.special_price)
      }))
  }
  products = (): Promise<ResponseSuccess<Product[]>> => {
    return axiosClient.get(API_URL.products).then((res) => res.data.context)
  }
  product = (id: number | string): Promise<Product> => {
    return axiosClient.get(
      API_URL.product(id),
      { params: { include: 'category | favorites' } }
    )
      .then((res) => ({
        ...res.data.context,
        price: parseInt(res.data.context.retail_price),
        special_price: parseInt(res.data.context.special_price)
      }))
  }
  galleries = (): Promise<any> => {
    return axiosClient.get(API_URL.galleries, {
      params: { include: 'images|videos' }
    })
      .then((res) => res.data.context.data)
  }
}

const api = new ApiClient()
export default api
