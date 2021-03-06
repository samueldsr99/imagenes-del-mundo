/**
 * Wrapper for https://developer.alegra.com requests
 */
import base64 from 'base-64'

const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;
const BASE_URL = import.meta.env.VITE_ALEGRA_BASE_URL;

const accessToken = base64.encode(`${USERNAME}:${PASSWORD}`)

const headers = new Headers()

headers.append('Authorization', `Basic ${accessToken}`)
headers.append('Content-Type', `application/json`)

export const getAllSellers = () => {
  return fetch(`${BASE_URL}/sellers`, { headers: headers })
    .then(r => r.json())
    .then(r => Promise.resolve(r))
    .catch(e => Promise.reject(e))
}

export const upvote = (sellerId, votes) => {
  return fetch(`${BASE_URL}/sellers/${sellerId}`, {
    headers: headers,
    method: 'PUT',
    body: JSON.stringify({
      observations: votes
    })
  })
    .then(r => r.json())
    .then(r => Promise.resolve(r))
    .catch(e => Promise.reject(e))
}

export const cleanSeller = (sellerId) => upvote(sellerId, 0)

export const cleanPoints = (sellers) =>
  Promise.all(sellers.map(s => cleanSeller(s.id)))

export const createInvoice = ({
  total,
  winnerId,
  date = new Date(),
  dueDate = new Date(),
  clientId = 1,
  productId = 1
}) => {
  return fetch(`${BASE_URL}/invoices`, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({
      date: date,
      dueDate: dueDate,
      client: clientId,
      seller: winnerId,
      items: [{
        id: productId,
        price: total,
        quantity: total
      }]
    })
  })
    .then(r => r.json())
    .then(r => Promise.resolve(r))
    .catch(e => Promise.reject(e))
}
