const body = document.querySelector('body');
const content = document.getElementById('content');

const newGame = document.getElementById('newGame');
const modal = document.getElementById('modal');
const placeForm = document.getElementById('placeform');
const shipTitle = document.getElementById('shipTitle');

const pScore = document.getElementById('pScore');
const interface = document.getElementById('interface');
const fireForm = document.getElementById('fireForm');
const cScore = document.getElementById('cScore');

const player = new Player();
const enemy = new Player();
const arena = document.getElementById('arena');
const pBoard = document.getElementById('player');
const cBoard = document.getElementById('comp');




initArena();
enemy.board.initShip('Carrier', 'A4', 'down');




newGame.addEventListener('click', () => {
    resetGame();
    placeShips();
});

fireForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let input = initFire(fireForm);
    takeTurn(input);
});


