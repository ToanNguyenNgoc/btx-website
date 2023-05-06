/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cart } from './cart'
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
  load: boolean,
  galleries: {
    data: any,
    load: boolean
  }
}
export interface HomeModule {
  services: {
    data: Service[],
    load: boolean
  },
  products: {
    data: Product[],
    load: boolean
  }
}
export interface CartModule {
  carts: Cart[],
  totalItem: number,
  totalAmount: number
}

export interface StoreState {
  userModule: UserModule,
  orgModule: OrgModule,
  homeModule: HomeModule,
  cartModule: CartModule
}
