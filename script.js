const pScore = document.getElementById('pScore');
const interface = document.getElementById('interface');
const cScore = document.getElementById('cScore');

const player = new Player();
const enemy = new Player();
const pBoard = document.getElementById('player');
const cBoard = document.getElementById('comp');


function stringCoords(arr) {
    let string = arr.toString();

    string = string.replaceAll(',', '');
    string = string.replaceAll(' ', '');
    string = string.replace('[', '');
    string = string.replace(']', '');

    return string;
}

function initArena() {// PLAYER BOARD
    // creates 10 rows and appends to player board
    for (let i = 0; i < player.board.board.length; i++) {
        let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const row = document.createElement('div');
        row.className = alph[i];
        pBoard.appendChild(row);
    
        row.style.width = '100%';
        row.style.height = '10%';
        row.style.display = 'flex';
    
        // create 10 squares in row
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div');
            square.className = 'p' + stringCoords(player.board.board[i][j]);
            row.appendChild(square);
    
            square.style.width = '10%';
            square.style.height = '100%';
            square.style.border = '0.01rem solid white';
        }
    }
    
    
    // ENEMY BOARD
    // creates 10 rows and appends to player board
    for (let i = 0; i < enemy.board.board.length; i++) {
        let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const row = document.createElement('div');
        row.className = alph[i];
        cBoard.appendChild(row);
    
        row.style.width = '100%';
        row.style.height = '10%';
        row.style.display = 'flex';
    
        // create 10 squares in row
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div');
            square.className = 'e' + stringCoords(player.board.board[i][j]);
            row.appendChild(square);
    
            square.style.width = '10%';
            square.style.height = '100%';
            square.style.border = '0.01rem solid white';
        }
    }
}
enemy.board.initShip('Carrier', 'A4', 'down');
console.log(enemy.board);

// Takes coordinate(string); enemy Gameboard logs hit
// or miss; corresponding DOM element changes color
// based on hit or miss
function playerTurn() {
    let input = prompt('Enter a coordinate');
    let name = 'e' + input;
    let square = document.getElementsByClassName(name)[0];

    let hit = enemy.board.receiveAttack(input);
    console.log(hit, enemy.board);

    // without, things happen too fast
    setTimeout(() => {
        if (hit) square.style.backgroundColor = 'red';
        else square.style.backgroundColor = 'cyan';
    }, 1000);
}

function enemyTurn() {
    // check if there is a hit on an UNSUNK
    // player ship - if yes, aim for a square
    // adjacent to that hit

    // ELSE

    // Generate coordinates based on Math.random
    // run player.board.receiveAttack()
    // update DOM
}



initArena();
playerTurn();