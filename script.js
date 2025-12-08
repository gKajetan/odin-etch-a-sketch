console.log('init');
const container = document.querySelector('.squaresContainer');

let size = 4;

for (let i = 0; i < size; i++) {
    let row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < size; j++) {
        let square = document.createElement('div');
        square.classList.add('square'); 
        row.appendChild(square); 
    }
    
    container.appendChild(row);
}