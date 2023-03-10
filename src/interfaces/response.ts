export interface ResponseSuccess<Data> {
  current_page:number,
  data:Data,
  first_page_url:string,
  from:number,
  last_page:string,
  last_page_url:string,
  links:string,
  next_page_url:string,
  path:string,
  per_page:number,
  prev_page_url:string,
  to:number,
  total:number
}