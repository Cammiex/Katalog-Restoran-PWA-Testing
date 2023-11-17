import 'regenerator-runtime'; /* for async await transpile */
import './component/nav-bar';
import '../styles/main.sass';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    button: document.querySelector('.hamburger'),
    drawer: document.querySelector('#drawer'),
    navMenu: document.querySelector('.nav-menu'),
    content: document.querySelector('#main-content'),
  });

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
  });
});

const hamburgerButton = document.querySelector('.hamburger');
const navMenuButton = document.querySelector('.nav-menu');

hamburgerButton.addEventListener('click', () => {
  navMenuButton.classList.toggle('active');
  hamburgerButton.classList.toggle('active');
});
