import { domain } from './axios'

const API_URL = {
  login: '/v1/auth/login',
  profile: '/v1/users/profile',
  register: '/v1/auth/forgotvoicesms',
  organizations: `/v1/organizations/${domain}`,
  media: '/v1/media',
  orders: `/v1/orders`,
  services: `/v1/organizations/${domain}/services`,
  service: (id: number | string) => `/v1/organizations/${domain}/services/${id}`,
  products: `/v1/organizations/${domain}/products`,
  product: (id: number | string) => `/v1/organizations/${domain}/products/${id}`,
}

export default API_URL
