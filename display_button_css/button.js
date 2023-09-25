const button_c = document.querySelector('.common_button-container');
const arrow = document.querySelector('.common_arrow');
// const follow_e = document.querySelector('.common_follow')

button_c.addEventListener('click', () => {
    arrow.style.animation = `none`;
    // follow_e.style.animation = `none`;
    // Trigger a reflow (repaint) to apply the 'none' style immediately
    void arrow.offsetWidth;
    arrow.style.animation = `moveArrow .5s ease-in forwards`;
    // follow_e.style.animation = `moveArrow .4s ease-in forwards`;
});
