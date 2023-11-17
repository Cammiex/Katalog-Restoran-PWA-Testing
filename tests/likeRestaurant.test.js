/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('make restaurant favorite', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 1 }]);
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
