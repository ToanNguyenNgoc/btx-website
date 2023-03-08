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
export interface UpdateProfile {
  fullname?: string,
  media_id?: string | number,
  email?: string
}
