import { domain } from './axios'

const API_URL = {
  login: '/v1/auth/login',
  profile: '/v1/users/profile',
  organizations: `/v1/organizations/${domain}`,
  media: '/v1/media'
}

export default API_URL
