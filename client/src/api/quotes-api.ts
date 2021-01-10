import { apiEndpoint } from '../config'
import { Quotes } from '../types/Quotes';
import { CreateQuotesRequest } from '../types/CreateQuotesRequest';
import Axios from 'axios'
import { UpdateQuotesRequest } from '../types/UpdateQuotesRequest';

export async function getQuotes(idToken: string): Promise<Quotes[]> {
  console.log('Fetching quotes')

  const response = await Axios.get(`${apiEndpoint}/quotes`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('quotes:', response.data)
  return response.data.items
}

export async function createQuotes(
  idToken: string,
  newQuote: CreateQuotesRequest
): Promise<Quotes> {
  const response = await Axios.post(`${apiEndpoint}/quotes`,  JSON.stringify(newQuote), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchQuotes(
  idToken: string,
  quoteId: string,
  updatedQuote: UpdateQuotesRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/quotes/${quoteId}`, JSON.stringify(updatedQuote), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteQuotes(
  idToken: string,
  quoteId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/quotes/${quoteId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  quoteId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/quotes/${quoteId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
