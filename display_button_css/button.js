const button_c = document.querySelector('.common_button-container');
const arrow = document.querySelector('.common_arrow');

button_c.addEventListener('click', () => {
    arrow.style.animation = `none`;
    void arrow.offsetWidth;
    arrow.style.animation = `moveArrow .5s ease-in forwards`;
    // URL delay
    delay("/Website_Elements");
});

function delay(URL) {
    setTimeout(function () {
        window.location = URL
    }, 500);
}