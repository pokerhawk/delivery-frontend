import axios from 'axios'
import { saleBaseUrl } from '../shared/constants'

const baseURL = import.meta.env.VITE_BASE_URL

const api = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
  },
})

export const saleApi = axios.create({
  baseURL: saleBaseUrl,
  headers: {
    'Accept': 'application/json',
  },
})

export default api
