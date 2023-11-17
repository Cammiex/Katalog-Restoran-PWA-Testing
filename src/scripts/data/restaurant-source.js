import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async listRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      throw new Error(`Error fetching restaurant list: ${error.message}`);
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      throw new Error(`Error fetching restaurant detail: ${error.message}`);
    }
  }

  static async addReview(review) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      };

      const response = await fetch(API_ENDPOINT.ADD_REVIEW, options);
      const responseJson = await response.json();
      return responseJson.customerReviews;
    } catch (error) {
      throw new Error(`Error adding review: ${error.message}`);
    }
  }
}

export default RestaurantSource;
