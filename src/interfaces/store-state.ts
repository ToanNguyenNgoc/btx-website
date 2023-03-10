/* eslint-disable @typescript-eslint/no-explicit-any */
import { Organization } from './organizations'
import { Product } from './product'
import { Service } from './service'

export interface UserModule {
  user: any,
  error: any,
  load: boolean
}
export interface OrgModule {
  org: Organization,
  load: boolean
}
export interface HomeModule {
  services: {
    data: Service[],
    load: boolean
  },
  products:{
    data:Product[],
    load:boolean
  }
}

export interface StoreState {
  userModule: UserModule,
  orgModule: OrgModule,
  homeModule: HomeModule
}
