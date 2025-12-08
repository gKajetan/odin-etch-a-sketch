console.log('init');
const container = document.querySelector('.squaresContainer');
const sliderText = document.querySelector('#sliderText');
const slider = document.querySelector('#slider');
sliderText.innerHTML = slider.value;
let currentSliderValue = parseInt(slider.value);

var mouseDown = false;

function clearGrid() {
    container.innerHTML = '';
}

function drawingActive(square) {
    // draw on hold
    square.addEventListener("mouseover", (event) => {
        if (mouseDown) {
            event.target.style.backgroundColor = "black";
        }
    });

    // draw on click
    square.addEventListener("click", (event) => {
        event.target.style.backgroundColor = "black";
    });
}

function createGrid(size) {
    // clear grid
    clearGrid();
    size = parseInt(size);
    // create rows
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        // create squares INSIDE rows
        for (let j = 0; j < size; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            drawingActive(square);
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

// listeners
slider.oninput = function () {
    sliderText.innerHTML = this.value;
    createGrid(this.value);
}

document.addEventListener('mousedown', () => {
    mouseDown = true;
})

document.addEventListener('mouseup', () => {
    mouseDown = false;
})

createGrid(slider.value);