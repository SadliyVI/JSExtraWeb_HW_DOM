import './index.css';
import gnomeSrc from './assets/gnome.png';

const SIZE = 4;
export const MOVE_INTERVAL_MS = 3000;

export function createGrid(container) {
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

export function placeGnomeInitially(grid, img) {
  const cells = Array.from(grid.querySelectorAll('.cell'));
  const idx = Math.floor(Math.random() * cells.length);
  cells[idx].appendChild(img);
  return idx;
}

export function startMoving(grid, img, initialIndex) {
  const cells = Array.from(grid.querySelectorAll('.cell'));
  let currentIndex = initialIndex;
  const max = cells.length;

  return setInterval(() => {
    const nextIndex = Math.floor(Math.random() * max);
    if (nextIndex !== currentIndex) {
      cells[nextIndex].appendChild(img);
      currentIndex = nextIndex;
    }
  }, MOVE_INTERVAL_MS);
}

export function main(appContainer = document.getElementById('app')) {
  if (!appContainer) return;

  const grid = createGrid(appContainer);

  const img = document.createElement('img');
  img.src = gnomeSrc;
  img.alt = 'gnome';

  const initial = placeGnomeInitially(grid, img);

  startMoving(grid, img, initial);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => main());
} else {
  main();
}
