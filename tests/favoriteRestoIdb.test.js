/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-resto-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getRestaurantList()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
    return;
  });
  itActsAsFavoriteRestoModel(FavoriteRestaurantIdb);
});