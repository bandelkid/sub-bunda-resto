//import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class DaftarResto {
  static async getRestaurantList() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANTS);
    return response.json();
  }

  static async getRestaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id));
    return response.json();
  }

  static async addReview({ id, name, review }) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345', // Gunakan token sesuai dokumentasi
      },
      body: JSON.stringify({
        id,
        name,
        review,
      }),
    });

    return response.json();
  }

}

export default DaftarResto;
