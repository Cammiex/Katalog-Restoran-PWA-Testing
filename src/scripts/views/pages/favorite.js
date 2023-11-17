import '../../component/hero-banner';
import '../../component/restaurant-list';
import '../../component/restaurant-item';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Favorite = {
  async render() {
    return `
      <article class="restaurant" id="favorite-restaurant">
        <div class="content">
          <h1 class="restaurant-label">Favorites Restaurant</h1>
          <restaurant-list></restaurant-list>
          <p class="restaurant-item__not__found">Not Found Any Restaurant</p>
        </div>
      </article>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('restaurant-list');

    if (restaurants.length > 0) {
      const notFoundMessage = document.querySelector('.restaurant-item__not__found');
      notFoundMessage.style.display = 'none';

      restaurants.forEach((restaurant) => {
        const restaurantItemElement = document.createElement('restaurant-item');
        restaurantItemElement.restaurant = restaurant;
        restaurantsContainer.appendChild(restaurantItemElement);
      });
    }
  },
};

export default Favorite;
