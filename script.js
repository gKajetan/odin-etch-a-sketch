console.log('Etch-A-Sketch started.');

// container with squares / canvas
const container = document.querySelector('.squaresContainer');

// slider
const sliderText = document.querySelector('#sliderText');
const slider = document.querySelector('#slider');
sliderText.innerHTML = slider.value;
let currentSliderValue = parseInt(slider.value);

// settings for modes
const setting = document.querySelector(`#setting`);
const settingsContainer = document.querySelector('.settingsContainer');
const normalModeRadio = document.querySelector('#normal');
let currentMode = normalModeRadio.value;

// color picker
const colorPicker = document.querySelector("#colorPicker");
let chosenColor = colorPicker.value;

// grid switcher
const gridSwitch = document.querySelector("#gridSwitch");

// user is not holding mouse button by default
let mouseDown = false;

// clears grid so new grid can take its place
function clearGrid() {
    container.innerHTML = '';
}

// sets up active drawing mode and its propeties
function drawingActive(square) {
    // draw with chosen mode
    const draw = (event) => {
        if (currentMode === 'normal') {
            event.target.style.backgroundColor = chosenColor;
            event.target.style.opacity = 1;
        }
        else if (currentMode === 'eraser') {
            event.target.style.backgroundColor = "white";
            event.target.style.opacity = 1;
        }
        else if (currentMode === 'rainbow') {
            event.target.style.backgroundColor = getRandomColor();
            event.target.style.opacity = 1;
        }
        // this works only because background of square container is black
        else if (currentMode === 'shader') {
            // parse opacity of target and set its value to 1
            let currentOpacity = parseFloat(event.target.style.opacity) || 1;

            if (currentOpacity != 0.1) {
                let newOpacity = currentOpacity - 0.1;
                event.target.style.opacity = newOpacity;
            }  
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

// switch drawing mode based on radio choice
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

// creates grid of squares based on size
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
            square.classList.add('squareBorder');
            drawingActive(square);
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

// listeners

// get and set slider value
slider.oninput = function () {
    sliderText.innerHTML = this.value;
    createGrid(this.value);
}

// get and set color picker value
colorPicker.oninput = function () {
    chosenColor = this.value;
}

// check whether user stopped holding mouse button
document.addEventListener('mouseup', () => {
    mouseDown = false;
})

// listen for radio button changes
settingsContainer.addEventListener('change', updateDrawingMode);

// grid switcher
gridSwitch.addEventListener('click', function() {
    // select every square
    const allSquares = document.querySelectorAll('.square');

    // switch border for each square
    allSquares.forEach(square => {
        square.classList.toggle('squareBorder');
    });
});

// create start grid
createGrid(slider.value);