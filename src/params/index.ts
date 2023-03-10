import { platForm } from "@/api/axios";

export const orderParam = {
  page: 1,
  limit: 15,
  'filter[platform]':platForm
}