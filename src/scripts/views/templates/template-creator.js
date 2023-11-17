import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <section class="restaurant-header">
    <div class="detail-header">
      <h1 class="detail-title">${restaurant.name}</h1>
      <div class="detail-info">
        <p>${restaurant.address}, ${restaurant.city}</p>
      </div>
    </div>
    <div class="image-container">
      <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
      <div class="detail-rating">
        <p>${restaurant.rating}</p>
      </div>
    </div>
    <div class="detail-description">
      <h2>Deskripsi restoran</h2>
      <p>${restaurant.description}</p>
    </div>
  </section>

  <section class="restaurant-menu">
    <h3 class="menu-title">Menu Restoran</h3>
    <div class="menu-container">
      <div class="menu-section">
        <h4><i class="fas fa-utensils"></i>Makanan</h4>
        <ul>
          ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ul>
      </div>
      <div class="menu-section">
        <h4><i class="fas fa-cocktail"></i>Minuman</h4>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section class="restaurant-review">
    <div class="detail-reviews">
      <h3>Customer Reviews</h3>
      <div class="review-container">
        ${restaurant.customerReviews.map((review) => `
          <div class="review-item">
            <div class="review-header">
              <p><strong>${review.name}</strong></p>
              <p>${review.date}</p>
            </div>
            <div class="review-content">
              <p>${review.review}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="form-container">
        <div class="form-item">
          <div class="add-header">
            <p><strong>Tambahkan Review Anda</strong></p>
          </div>
          <div class="review-content">
            <form id="review-form">
              <label for="name">Nama</label>
              <input type="text" id="name" required>
              <label for="review">Review</label>
              <textarea id="review" required></textarea>
              <button type="submit">Tambah Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
    <span class="button-text">Add to Favorite</span>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
    <span class="button-text">Remove from Favorite</span>
  </button>
`;

export { createRestaurantDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate };
