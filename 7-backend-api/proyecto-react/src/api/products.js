import { request } from './config.js'

// GET /products
export const getProducts = () => request('products')
