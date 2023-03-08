/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import api from '@/api/apiClient'

export async function postMedia (e: Event) {
  let media_ids: number[] = []
  let original_urls: string[] = []
  const files = (e.target as HTMLInputElement).files ?? []
  for (var i = 0; i < files?.length; i++) {
    let formData = new FormData()
    formData.append('file', files[i])
    const response = await api.media(formData)
    media_ids.push(response.model_id)
    original_urls.push(response.original_url)
  }
  return { media_ids, original_urls }
}
