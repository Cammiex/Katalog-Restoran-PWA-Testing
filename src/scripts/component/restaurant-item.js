import CONFIG from '../globals/config';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this._loading = true;
    this._error = false;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.setLoading(true);
    this.setError(false);
    this.loadRestaurantDataFromAPI();
  }

  setLoading(loading) {
    this._loading = loading;
    this.render();
  }

  setError(error) {
    this._error = error;
    this.render();
  }

  loadRestaurantDataFromAPI() {
    fetch(`${CONFIG.BASE_URL}/list`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        this.setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading data:', error);

        const errorMessage = error.message || 'Oops, something went wrong.';
        this.setError({ message: errorMessage });

        this.setLoading(false);
      });
  }

  render() {
    const loadingHtml = this._loading
      ? `
        <div class="loading">
          <style>
            .lds-ring-container {
            align-items: center;
            height: 100%;
            display: flex;
            justify-content: center;
          }
          .lds-ring {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid #9c938b;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #9c938b transparent transparent transparent;
          }
          .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
          }
          .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          </style>
           <div class="lds-ring-container">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        </div>
      `
      : '';

    const errorHtml = this._error
      ? `
         <div class="error">
          <div class="exclamation-icon">
            <div class="circle">
              <div class="exclamation-mark">!</div>
            </div>
          </div>
          <p><strong>Failed to load restaurant data.</strong></p>
          <p>Error: ${this._error.message}</p>
        </div>
      `
      : '';

    const restaurantInfoHidden = this._loading || this._error ? 'hidden' : '';

    this.innerHTML = `
      <style>
         * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        main {
        width: 100%;
        margin: 0 auto;
        }

        .restaurant-item {
         overflow: visible;
        position: relative;
        width: 100%;
        border-radius: 2px;
        }

        .restaurant-item img {
        width: 100%;
        max-height: 300px;
        border-radius: 2px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
        }

        .restaurant-title a {
        min-width: 44px;
        min-height: 44px;
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        text-decoration: none;
        color: #653b24;
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .restaurant-title a:hover {
        color: var(--third-color);
        }

        .restaurant-info {
        transform: translateX(-50%);
        width: 100%;
        background-color: white;
        z-index: 1;
        padding: 15px;
        position: absolute;
        bottom: -40px;
        left: 50%;
        font-size: 0.9rem;
        border-radius: 1em;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .info-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5em;
        }

        .restaurant-rating {
        padding: 3px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        }

        .restaurant-rating::before {
        content: "\\2605";
        color: #ffd700;
        margin-right: 0.2em;
        }

        .error {
          background-color: #fff;
          border: 1px solid #9c938b;
          padding: 20px;
          text-align: center;
          border-radius: 10px;
          max-width: 300px;
          margin: 0 auto;
        }

        .exclamation-icon {
          display: inline-block;
          position: relative;
          width: 48px;
          height: 48px;
          margin-bottom: 10px;
        }

        .circle {
          width: 48px;
          height: 48px;
          background-color: red;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .exclamation-mark {
          color: white;
          font-size: 34px;
          font-weight: bold;
        }

        strong {
          color: black;
        }

        p:last-child {
          margin-top: 4px;
        }

        @media screen and (min-width: 900px) {
        .restaurant-item h1 {
            margin: 0;
            font-size: 1rem;
        }
        }

      </style>
       <div class="restaurant-item">
        ${loadingHtml}
        ${errorHtml}
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + this._restaurant.pictureId}" alt="${this._restaurant.name}" ${this._loading || this._error ? 'hidden' : ''}>
        <div class="restaurant-layer" ${restaurantInfoHidden}>
          <div class="info-top">
            <h1 class="restaurant-title">
              <a href="/#/detail/${this._restaurant.id}">${this._restaurant.name}</a>
            </h1>
            <p class="restaurant-rating">${this._restaurant.rating}/5</p>
          </div>
          <p class="restaurant-city">${this._restaurant.city}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
