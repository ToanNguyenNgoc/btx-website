/* eslint-disable camelcase */
export interface User {
  avatar: string,
  media: [],
  email: string
  fullname: string
  id: number
  telephone: string
  token: string
  token_expired_at: string,
  btx_points: number
}
export interface Login {
  email: string | number,
  password: string
}
export interface Register {
  telephone: number | string,
  code?: number | string,
  new_password?: number | string
}
export interface UpdateProfile {
  fullname?: string,
  media_id?: string | number,
  email?: string
}
