
const slider = document.querySelector(".slider");
const sliderThumbs = document.querySelectorAll(".slider-thumb");
const numbers = document.querySelectorAll(".numbers");
const MAX_VALUE = 100 * sliderThumbs.length;

let isDragging = false;
let targetSlider = null;

sliderThumbs.forEach((ele,idx) => {
    ele.style.transform = `translateY(${slider.clientHeight - (slider.clientHeight / 2) - ele.clientHeight / 2}px)`;
});
refreshNumbers();

sliderThumbs.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
        isDragging = true;
        targetSlider = e.target;
    });
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    targetSlider = null;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const offsetY = e.clientY - slider.getBoundingClientRect().top;
    const newValue = Math.min(slider.clientHeight, Math.max(0, offsetY));
    if(sliderThumbs.length!==1) {
        correctRestPosition(targetSlider, newValue - getPosition(targetSlider));
    }
    setPosition(targetSlider, newValue);
});

// position from the top
function getPosition (ele) {
    return ele.getBoundingClientRect().top + (ele.clientHeight / 2)  - slider.getBoundingClientRect().top;
}
// sets the position newY form the top
function setPosition (ele, newY) {
    return ele.style.transform = `translateY(${newY - ele.clientHeight/2}px)`;
}
function refreshNumbers() {
    sliderThumbs.forEach((ele, idx) => {
        const position = getPosition(ele);

        let value = Math.round((slider.clientHeight - position )/ slider.clientHeight * MAX_VALUE);

        numbers[idx].textContent = `${value}`;
    });
}
function correctRestPosition(ele, m_amount) { // m_amount in the direction of the moved slider
    let excluded = [ele];
    let c = 0;
    m_amount *= -1;     // m_amount now in the direction in which the other sliders must go

    while (Math.abs(m_amount) > 1e-3) {
        let residual = 0;
        c++;
        if (c > 100) {
            alert("CRASH: infinite loop");
            return;
        }
        const count =  sliderThumbs.length - excluded.length;
        const sliders_n = count < 1 ? 1 : count;
        const partial_move = m_amount / sliders_n;

        sliderThumbs.forEach((inner_ele) => {
            if (! excluded.includes(inner_ele)) {
                // move the element by its partial move
                const current_pos = getPosition(inner_ele);
                let where = current_pos + partial_move;
                if (where < 0 || where > slider.clientHeight) {
                    const old_where = where;
                    where = where < 0 ? 0 : slider.clientHeight;
                    m_amount += old_where - where;
                    excluded.push(inner_ele);
                }
                setPosition(inner_ele, where);
                m_amount -= partial_move;
            }
        })
        m_amount += residual;
        refreshNumbers();
    }
}