const drawerClose = document.querySelector('.drawer-container button');
const drawerOpen = document.querySelector('.hamburger');
const drawer = document.querySelector('.drawer-wrapper');

drawerClose.addEventListener('click', (e) => {
  e.stopPropagation();
  drawer.classList.remove('open');
});

drawerOpen.addEventListener('click', (e) => {
  e.stopPropagation();
  drawer.classList.add('open');
});