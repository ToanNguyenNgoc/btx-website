import { platForm } from "@/api/axios";

export const orderParam = {
  page: 1,
  limit: 2,
  'filter[platform]':platForm
}