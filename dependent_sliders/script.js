
const slider = document.querySelector(".slider");
const sliderThumbs = document.querySelectorAll(".slider-thumb");
const numbers = document.querySelectorAll(".numbers");
const MAX_VALUE = 100 * sliderThumbs.length;

let isDragging = false;
let targetSlider = null;

sliderThumbs.forEach((ele,idx) => {
    ele.style.transform = `translateY(${slider.clientHeight - (slider.clientHeight / sliderThumbs.length) - ele.clientHeight / 2}px)`;
    changeNumber(ele, idx);
});


sliderThumbs.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
        isDragging = true;
        targetSlider = e.target;
    });
});



document.addEventListener("mouseup", () => {
    isDragging = false;
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
// TODO numbers are inaccurate, find a solution to make them precise
function changeNumber(ele, index) {
    const position = getPosition(ele);
    // let sum = 0;
    // numbers.forEach((number,num_idx) => {
    //     if(num_idx !== index) {
    //         sum += number;
    //     }
    // })
    let value = Math.round((slider.clientHeight - position )/ slider.clientHeight * MAX_VALUE);
    // while (value + sum !== MAX_VALUE ) {
    //     value += (value + sum) > MAX_VALUE ? -1 : 1;
    // }
    numbers[index].textContent = `${value}`;
}
// TODO treat case where there is one slider, partial move invalid
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

        sliderThumbs.forEach((inner_ele, inner_ele_idx) => {
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
            changeNumber(inner_ele, inner_ele_idx);
        })
        m_amount += residual;

    }
}