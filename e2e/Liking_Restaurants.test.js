/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking and Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#favorite-restaurant');
  I.see('Not Found Any Restaurant', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Not Found Any Restaurant', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant-title a');
  const firstRestaurant = locate('.restaurant-title a');
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click('.restaurant-title a');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-title a');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-title a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking the restaurants', ({ I }) => {
  I.see('Not Found Any Restaurant', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant-title a');
  I.click(locate('.restaurant-title a'));

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.seeElement('.restaurant-title a');
  I.click('.restaurant-title a');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.see('Not Found Any Restaurant', '.restaurant-item__not__found');
});
