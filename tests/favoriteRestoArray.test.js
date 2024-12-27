/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';
let favoriteResto = [];
const favoriteRestoArray = {
  getRestaurant(id) {
    if (!id){
      return;
    }

    return favoriteResto.find((restaurant) => restaurant.id == id);
  },

  getRestaurantList(){
    return favoriteResto;
  },

  putRestaurant(restaurant){
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')){
      return;
    }

    if (this.getRestaurant(restaurant.id)){
      return;
    }
    favoriteResto.push(restaurant);
  },

  deleteRestaurant(id){
    favoriteResto = favoriteResto.filter((restaurant) => restaurant.id !=id);
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteResto = [];
  });
  itActsAsFavoriteRestoModel(favoriteRestoArray);
});

