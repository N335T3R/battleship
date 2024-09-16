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
        cBoard.appendChild(row);
    
        row.style.width = '100%';
        row.style.height = '10%';
        row.style.display = 'flex';
    
        // create 10 squares in row
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div');
            square.className = stringCoords(player.board.board[i][j]);
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
        pBoard.appendChild(row);
    
        row.style.width = '100%';
        row.style.height = '10%';
        row.style.display = 'flex';
    
        // create 10 squares in row
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div');
            square.className = stringCoords(player.board.board[i][j]);
            row.appendChild(square);
    
            square.style.width = '10%';
            square.style.height = '100%';
            square.style.border = '0.01rem solid white';
        }
    }
}


initArena();
