import LikeButtonPresenter from '../../src/scripts/views/pages/like-button-presenter';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-resto-idb';

const createLikeButtonPresenterWithResto = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoritRestaurant: FavoriteRestaurantIdb,
    restaurant,
  });
};

export { createLikeButtonPresenterWithResto };