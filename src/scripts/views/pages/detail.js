import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const updateReviews = (newReviews) => {
  const reviewContainer = document.querySelector('.review-container');
  reviewContainer.innerHTML = '';

  newReviews.forEach((review) => {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    const reviewHeader = document.createElement('div');
    reviewHeader.classList.add('review-header');
    reviewHeader.innerHTML = `
      <p><strong>${review.name}</strong></p>
      <p>${review.date}</p>
    `;

    const reviewContent = document.createElement('div');
    reviewContent.classList.add('review-content');
    reviewContent.innerHTML = `<p>${review.review}</p>`;

    reviewItem.appendChild(reviewHeader);
    reviewItem.appendChild(reviewContent);
    reviewContainer.appendChild(reviewItem);
  });
};

const Detail = {
  async render() {
    return `
      <article id="detail-restaurant" class="detail-restaurant"></article>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log('Current URL ID:', url.id);
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    console.log('Detail Restaurant:', restaurant);
    const restaurantContainer = document.querySelector('#detail-restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });

    const reviewForm = document.querySelector('#review-form');
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const userName = document.querySelector('#name').value;
      const userReview = document.querySelector('#review').value;

      const reviewData = {
        id: restaurant.id,
        name: userName,
        review: userReview,
      };

      try {
        const newReviews = await RestaurantSource.addReview(reviewData);
        console.log('Success: Review added successfully');

        document.querySelector('#name').value = '';
        document.querySelector('#review').value = '';

        updateReviews(newReviews);
      } catch (error) {
        console.error('Error adding review:', error);
      }
    });
  },
};

export default Detail;
