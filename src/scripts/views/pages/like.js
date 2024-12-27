import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
        <div class="content">
          <h2 class="content__heading">Your Favorite Restaurant</h2>
          <div id="restaurant-list" class="restaurant-list">
          </div>
        </div>
      `;
  },

  async afterRender() {
    const restaurant = await FavoriteRestaurantIdb.getRestaurantList();
    const restaurantListContainer = document.querySelector('#restaurant-list');
    restaurant.forEach((restaurant) => {
      restaurantListContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },

};
export default Like;