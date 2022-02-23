const canvas = document.querySelector('.canvas');
canvas.width = widthGameScreen();
canvas.height = heightGameScreen();
const ctx = canvas.getContext('2d');

function widthGameScreen() {
  return window.screen.width - window.screen.width / 2.5;
}

function heightGameScreen() {
  return window.screen.height - window.screen.height / 4.5;
}
