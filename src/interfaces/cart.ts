export interface Cart {
  item_id: string,
  id: number | string,
  name: string,
  image_url: string,
  type: 'SERVICE' | 'PRODUCT' | 'COMBO',
  price: number,
  special_price: number,
  quantity: number,
  confirm: boolean
}