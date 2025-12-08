console.log('init');
const container = document.querySelector('.squaresContainer');
// slider
const sliderText = document.querySelector('#sliderText');
const slider = document.querySelector('#slider');
sliderText.innerHTML = slider.value;
let currentSliderValue = parseInt(slider.value);

const setting = document.querySelector(`#setting`);
const settingsContainer = document.querySelector('.settingsContainer');
const normalModeRadio = document.querySelector('#normal');
let currentMode = normalModeRadio.value;

let mouseDown = false;

function clearGrid() {
    container.innerHTML = '';
}

function drawingActive(square) {
    // draw with chosen mode
    const draw = (event) => {
        if (currentMode === 'normal') {
            event.target.style.backgroundColor = "black";
        }
        else if (currentMode === 'eraser') {
            event.target.style.backgroundColor = "white";
        }
        else if (currentMode === 'rainbow') {
            event.target.style.backgroundColor = getRandomColor();
        }
    };

    // draw on click
    square.addEventListener('mousedown', (event) => {
        mouseDown = true;
        draw(event);
    });

    // draw on hold
    square.addEventListener("mouseover", (event) => {
        if (mouseDown) {
            draw(event);
        }
    });
}

function updateDrawingMode(event) {
    if (event.target.type === 'radio') {
        currentMode = event.target.value;
        console.log(`Active mode: ${currentMode}`);
    }
}

function getRandomColor() {
    // random R G B color channels
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // return complete RGB color
    return `rgb(${r}, ${g}, ${b})`;
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

document.addEventListener('mouseup', () => {
    mouseDown = false;
})

settingsContainer.addEventListener('change', updateDrawingMode);

createGrid(slider.value);