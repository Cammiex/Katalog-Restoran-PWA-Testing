import '../../component/hero-banner';
import '../../component/restaurant-list';
import '../../component/restaurant-item';
import RestaurantSource from '../../data/restaurant-source';

const Home = {
  async render() {
    return `
      <hero-banner></hero-banner>
      <article class="restaurant">
        <div class="content">
          <h1 class="restaurant-label">Daftar Restoran</h1>
          <restaurant-list></restaurant-list>
        </div>
      </article>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantsContainer = document.querySelector('restaurant-list');
    restaurants.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      restaurantsContainer.appendChild(restaurantItemElement);
    });
  },
};

export default Home;
