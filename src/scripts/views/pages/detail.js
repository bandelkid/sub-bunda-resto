import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/resto-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from './like-button-presenter';

const Detail = {
  async render() {
    return `
      <div id="restaurant-list" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer">
        <h3>Write a Review</h3>
        <form id="reviewForm">
          <input type="text" id="reviewerName" placeholder="Your Name" required />
          <textarea id="reviewContent" placeholder="Write your review..." required></textarea>
          <button type="submit">Submit Review</button>
        </form>
        <div id="reviewsContainer">
          <h3>Customer Reviews</h3>
          <div id="reviewsList"></div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantSource.getRestaurantDetail(url.id);
      const restaurantListContainer = document.querySelector('#restaurant-list');
      restaurantListContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

      const restaurantForLike = this._createRestaurantForLike(restaurant.restaurant);
      const likeButtonContainer = document.querySelector('#likeButtonContainer');

      await LikeButtonPresenter.init({
        likeButtonContainer,
        restaurant: restaurantForLike, // Hanya data yang diperlukan
      });

      // Render existing reviews
      this._renderReviews(restaurant.restaurant.customerReviews);

      // Handle review submission
      this._handleReviewSubmission(url.id);
    } catch (error) {
      console.error(error);
      const restaurantListContainer = document.querySelector('#restaurant-list');
      restaurantListContainer.innerHTML = '<p>Gagal memuat detail restoran.</p>';
    }
  },

  _createRestaurantForLike(restaurant) {
    return {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      pictureId: restaurant.pictureId,
      city: restaurant.city,
      rating: restaurant.rating,
    };
  },

  _renderReviews(reviews) {
    const reviewsList = document.querySelector('#reviewsList');
    reviewsList.innerHTML = reviews
      .map(
        (review) => `
          <div class="review-item">
            <p><strong>${review.name}</strong> (${review.date})</p>
            <p>${review.review}</p>
          </div>
        `
      )
      .join('');
  },

  _handleReviewSubmission(restaurantId) {
    const reviewForm = document.querySelector('#reviewForm');
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewerName = document.querySelector('#reviewerName').value;
      const reviewContent = document.querySelector('#reviewContent').value;

      try {
        const reviewResponse = await RestaurantSource.addReview({
          id: restaurantId,
          name: reviewerName,
          review: reviewContent,
        });

        // Refresh reviews
        if (reviewResponse.customerReviews) {
          this._renderReviews(reviewResponse.customerReviews);
          reviewForm.reset();
        }
      } catch (error) {
        console.error('Gagal mengirim ulasan:', error);
        alert('Gagal mengirim ulasan. Silakan coba lagi.');
      }
    });
  },
};

export default Detail;
