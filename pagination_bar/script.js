const moveLeftButton = document.getElementById('moveLeft');
const moveRightButton = document.getElementById('moveRight');

let currentPosition = 0; // Initial position

moveLeftButton.addEventListener('click', () => {
    currentPosition--;
    movePill();
});

moveRightButton.addEventListener('click', () => {
    currentPosition++;
    movePill();
});

function movePill() {
    const container = document.querySelector('.container');
    const numPills = container.childElementCount;

    if (currentPosition < 0) {
        currentPosition = numPills - 1;
    } else if (currentPosition >= numPills) {
        currentPosition = 0;
    }

    const pills = document.querySelectorAll('.pill');
    pills.forEach((pill, index) => {
        if (index === currentPosition) {
            pill.classList.add('red-pill');
        } else {
            pill.classList.remove('red-pill');
        }
    });
}