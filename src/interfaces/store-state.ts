/* eslint-disable @typescript-eslint/no-explicit-any */
import { Organization } from './organizations'

export interface UserModule {
  user: any,
  error: any,
  load: boolean
}
export interface OrgModule {
  org: Organization,
  load:boolean
}

export interface StoreState {
  userModule: UserModule,
  orgModule: OrgModule
}
