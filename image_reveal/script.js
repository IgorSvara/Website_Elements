const frame = document.querySelector('.frame');
const moveLeftButton = document.getElementById('moveLeft');
const moveRightButton = document.getElementById('moveRight');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const originalWidth = getComputedStyle(frame).width;
const originalR = getComputedStyle(moveRightButton).backgroundColor;
const originalL = getComputedStyle(moveLeftButton).backgroundColor;

moveLeftButton.addEventListener('click', () => {
    frame.style.width = '0px';
    moveLeftButton.classList.add('deactivate-button');
    moveRightButton.classList.remove('deactivate-button');
});

moveRightButton.addEventListener('click', () => {
    frame.style.width = originalWidth;
    moveLeftButton.classList.remove('deactivate-button');
    moveRightButton.classList.add('deactivate-button');
});
