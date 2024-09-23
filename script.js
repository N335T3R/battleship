const pScore = document.getElementById('pScore');
const interface = document.getElementById('interface');
const fireForm = document.getElementById('fireForm');
const cScore = document.getElementById('cScore');

const player = new Player();
const enemy = new Player();
const pBoard = document.getElementById('player');
const cBoard = document.getElementById('comp');



enemy.board.initShip('Carrier', 'A4', 'down');
// console.log(enemy.board);
function initFire() {
    var formData = new FormData(fireForm);
    let obj = Object.fromEntries(formData);
    let arr = [];
    let d = /\p{N}/u;

    // pushes value of key,value pair to arr
    for (var pair of formData.entries()) arr.push(pair[1]);
    

    let string = stringCoords(arr);
    return string;
}
// Takes coordinate(string); enemy Gameboard logs hit
// or miss; corresponding DOM element changes color
// based on hit or miss
fireForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let input = initFire();
    takeTurn(input);
});



initArena();
// takeTurn();