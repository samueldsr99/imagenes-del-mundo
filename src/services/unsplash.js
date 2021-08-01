const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

const baseUrl =
  `https://api.unsplash.com/search/photos/?page=1&client_id=${UNSPLASH_API_KEY}`

/**
 * Fetch images from Unsplash API
 * @param {string} keyword 
 * @param {number} amount 
 */
export const fetchImages = (keyword, amount) => {
  return fetch(`${baseUrl}&query=${keyword}&per_page=${amount}`)
      .then(r => r.json())
      .then(r => Promise.resolve(r.results))
      .catch(e => Promise.reject(e))
}
