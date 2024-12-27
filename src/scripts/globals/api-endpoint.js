import CONFIG from './config';

const API_ENDPOINT = {
  LIST_RESTAURANTS: `${CONFIG.BASE_URL}list`, // Endpoint untuk mendapatkan daftar restoran
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}detail/${id}`, // Endpoint untuk mendapatkan detail restoran berdasarkan ID
  SEARCH_RESTAURANT: (query) => `${CONFIG.BASE_URL}search?q=${query}`, // Endpoint untuk mencari restoran berdasarkan query
  REVIEW: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
