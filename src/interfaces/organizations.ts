/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
export interface Branch {
  address: string;
  created_at: string;
  district: string | null;
  district_code: string | null;
  full_address: string;
  id: number;
  image: string | null;
  image_url: string;
  latitude: number;
  longitude: number;
  name: string;
  organization_id: number;
  origin_id: number;
  province: number | string | null;
  province_code: number | string | null;
  telephone: string;
  ward: string | null;
  ward_code: string | null;
  distance?: number
}
export interface IFavorite {
  created_at: string
  favoritetable_id?: number
  favoritetable_type?: number
  id: number
  organization_id: number
  updated_at: string
  user_id: number
}
export interface Organization {
  id: number;
  name: string;
  subdomain: string;
  latitude: number;
  longitude: number;
  address: string;
  min_price: number;
  max_price: number;
  image: string;
  is_momo_ecommerce_enable: boolean;
  created_at: string;
  updated_at: string;
  province_code: number;
  district_code: number;
  ward_code: number;
  full_address: string;
  image_url: string;
  branches: Branch[];
  opening_time: any;
  description: string;
  favorites_count: number;
  is_favorite: boolean;
  favorites: IFavorite[];
  distance: number | undefined;
  tags: [];
  telephone: [];
}
