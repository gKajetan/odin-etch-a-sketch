console.log('init');
const container = document.querySelector('.squaresContainer');
const sliderText = document.querySelector('#sliderText');
const slider = document.querySelector('#slider');
sliderText.innerHTML = slider.value;
let currentSliderValue = parseInt(slider.value);

slider.oninput = function() {
    sliderText.innerHTML = this.value;
    createGrid(this.value);
}

function createGrid(size) {
    // clear grid
    container.innerHTML = '';
    size = parseInt(size);
    // create rows
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        // create squares INSIDE rows
        for (let j = 0; j < size; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

createGrid(slider.value);