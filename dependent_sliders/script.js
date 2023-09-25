class Slider {

    min = 0
    max = 100

    constructor(ele, listener) {
        this._value = 0
        this._dragging = false

        // Extract components
        this.lineEle = ele.querySelector('.slider')

        this.thumbEle = ele.querySelector('.slider-thumb')
        // Define dragging loop
        let draggingOffset = 0
        this.thumbEle.addEventListener('mousedown', (e) => {
            this._dragging = true;
            draggingOffset = e.clientY - this.thumbEle.getBoundingClientRect().top - this.thumbEle.clientHeight / 2
            listener?.(this)
        })
        document.addEventListener('mousemove', (e) => {
            if (!this._dragging) return
            const offsetY = e.clientY - this.lineEle.getBoundingClientRect().top - draggingOffset
            const clippedValue = Math.min(this.lineEle.clientHeight, Math.max(0, offsetY))
            this.value = (clippedValue / this.lineEle.clientHeight) * (this.max - this.min) + this.min
            listener?.(this)
        })
        document.addEventListener('mouseup', () => {
            this._dragging = false
            listener?.(this)
        })

        // Set initial position
        this.value = 0
    }

    get dragging() {
        return this._dragging
    }

    get value() {
        return this._value
    }

    set value(value) {
        this._value = Math.min(this.max, Math.max(this.min, value))
        this.thumbEle.style.transform = `translateY(${
            ((this._value - this.min) / (this.max - this.min))
            * (this.lineEle.clientHeight - this.lineEle.clientWidth)
            - (this.thumbEle.clientHeight / 2)
            + (this.lineEle.clientWidth / 2)
        }px)`;
    }

    get isMax() {
        return this._value === this.max
    }

    get isMin() {
        return this._value === this.min
    }

}


// Usage
const sliderEls = Array.from(document.querySelectorAll(".slider-container"))
const numberEls = Array.from(document.querySelectorAll(".numbers"))
const totalValue = sliderEls.length * 100
const sliders = sliderEls.map(ele => {
    const slider = new Slider(ele, onUpdate)
    slider.max = totalValue
    return slider
})

function onUpdate(slider) {

    // Do this
    for (let i = 0; i < (sliderEls.length + 1); i++) {
        const delta
            = totalValue
            - sliders.map(s => s.value).reduce((a, b) => a + b, 0)
        if (delta === 0) break
        const candidates = sliders
            .filter(s => s !== slider && (delta >= 0 ? !s.isMax : !s.isMin))
        candidates.forEach(s => s.value += delta / candidates.length)
    }

    // Update texts
    sliders.forEach((s, ix) => numberEls[ix].textContent = `${Math.round(s.value)}`)

}

onUpdate()
