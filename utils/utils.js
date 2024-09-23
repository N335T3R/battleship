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


// Make this function a Gameboard method?
function getRandomCoord() {
    // Block of delcarations generates a random coordinate
    let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let die = Math.floor(Math.random() * 10);
    let die2 = Math.floor(Math.random() * 10);
    let row = alph[die];
    let col = nums[die2];
    let coord = (row + col).toString();

    return coord;
}


function playerTurn(input) {
    // let input = prompt('Enter a coordinate');
    let name = 'e' + input;
    let square = document.getElementsByClassName(name)[0];

    let hit = enemy.board.receiveAttack(input);
    // console.log(hit, enemy.board);

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

    let coord = getRandomCoord();

    // write code to see if 
    // player.board.misses.includes(coord) ||
    // player.board.hits.includes(coord);

    let square = document.getElementsByClassName('p' + coord)[0];
    // console.log(square);

    let hit = player.board.receiveAttack(coord);
    // console.log(hit, enemy.board);

    // without, things happen too fast
    setTimeout(() => {
        if (hit) square.style.backgroundColor = 'red';
        else square.style.backgroundColor = 'cyan';
    }, 1000);

    // console.log(player);
}


function takeTurn(input) {
    playerTurn(input);
    enemyTurn();
}