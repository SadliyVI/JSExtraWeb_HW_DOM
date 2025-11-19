import './index.css';
import gnomeSrc from './assets/gnome.png';


// Настройки поля
const SIZE = 4; 
const MOVE_INTERVAL_MS = 3000; // время смены картинки


function createGrid(container) {
    const grid = document.createElement('div');
    grid.id = 'game';

    for (let r = 0; r < SIZE * SIZE; r += 1) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = r;
        grid.appendChild(cell);
    }


    container.appendChild(grid);
    return grid;
}


function randomIndex(excludeIndex, max) {
    let idx = Math.floor(Math.random() * max);
    // исключение повторения той-же ячейки
    while (idx === excludeIndex) {
        idx = Math.floor(Math.random() * max);
    }
    return idx;
}


function placeGnomeInitially(grid, img) {
    const cells = Array.from(grid.querySelectorAll('.cell'));
    const idx = Math.floor(Math.random() * cells.length);
    cells[idx].appendChild(img); 
    return idx;
}


function startMoving(grid, img, initialIndex) {
    const cells = Array.from(grid.querySelectorAll('.cell'));
    let currentIndex = initialIndex;
    const max = cells.length;

    return setInterval(() => {
        const nextIndex = randomIndex(currentIndex, max);
        cells[nextIndex].append(img);
        currentIndex = nextIndex;
    }, MOVE_INTERVAL_MS);
}


function main() {
    const app = document.getElementById('app');
    const grid = createGrid(app);

    const img = document.createElement('img');
    img.src = gnomeSrc;
    img.alt = 'gnome';


    const initial = placeGnomeInitially(grid, img);

    startMoving(grid, img, initial);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}