import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, navMenu, content,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._navMenu = navMenu;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    const hamburger = this._button;
    const navMenu = this._navMenu;

    if (hamburger && navMenu) {
      DrawerInitiator.init({
        button: hamburger,
        drawer: this._drawer,
        navMenu,
        content: this._content,
      });
    }
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipContent = document.querySelector('.skip-link');
    skipContent.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#main-content').focus();
    });
  }
}

export default App;
