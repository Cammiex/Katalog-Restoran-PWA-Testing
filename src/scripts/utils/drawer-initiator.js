const DrawerInitiator = {
  init({
    button, drawer, navMenu, content,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, button, drawer, navMenu);
    });

    navMenu.addEventListener('click', (event) => {
      this._closeDrawer(event, button, drawer, navMenu);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, button, drawer, navMenu);
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        this._toggleDrawer(event, button, drawer, navMenu);
        event.preventDefault();
      }
    });
  },

  _toggleDrawer(event, button, navMenu) {
    event.stopPropagation();
    button.classList.toggle('active');
    navMenu.classList.toggle('active');
  },

  _closeDrawer(event, button, navMenu) {
    event.stopPropagation();
    button.classList.remove('active');
    navMenu.classList.remove('active');
  },
};

export default DrawerInitiator;
