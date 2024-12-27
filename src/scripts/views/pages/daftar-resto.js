import RestaurantSource from '../../data/resto-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const DaftarResto = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Daftar Restoran</h2>
        <div id="restaurant-list" class="restaurant-list">
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const data = await RestaurantSource.getRestaurantList();
      console.log('API Response:', data); // Check the structure of `data`
      const restaurantListContainer = document.querySelector('#restaurant-list');

      const restaurants = data.restaurants || []; // Adjust this based on the actual key
      if (Array.isArray(restaurants)) {
        restaurants.forEach((restaurant) => {
          restaurantListContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      } else {
        throw new Error('Invalid data format: expected an array');
      }
    } catch (error) {
      console.error('Error in afterRender:', error);
      document.querySelector('#restaurant-list').innerHTML = '<p>Failed to load restaurants.</p>';
    }
  },
};

export default DaftarResto;
