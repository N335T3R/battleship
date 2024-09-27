function stringCoords(arr) {
    let string = arr.toString();

    string = string.replaceAll(',', '');
    string = string.replaceAll(' ', '');
    string = string.replace('[', '');
    string = string.replace(']', '');

    return string;
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

function initFire(form) {
    var formData = new FormData(form);
    let obj = Object.fromEntries(formData);
    let arr = [];
    let d = /\p{N}/u;

    // pushes value of key,value pair to arr
    for (var pair of formData.entries()) arr.push(pair[1]);
    

    let string = stringCoords(arr);
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

function resetGame() {
    modal.style.display = 'block';
    content.style.filter = 'blur(8px)';
    

    for(let i = 0; i < player.board.board.length; i++) {
        for (let j = 0; j < player.board.board[i].length; j++) {
            let name = 'p' + stringCoords(player.board.board[i][j]);
            // console.log(name);
            let square = document.getElementsByClassName(name)[0];
            square.style.backgroundColor = 'transparent';
            square.style.opacity = '0.75';
        }
    }

    for(let i = 0; i < enemy.board.board.length; i++) {
        for (let j = 0; j < enemy.board.board[i].length; j++) {
            let name = 'e' + stringCoords(player.board.board[i][j]);
            // console.log(name);
            let square = document.getElementsByClassName(name)[0];
            square.style.backgroundColor = 'transparent';
            square.style.opacity = '0.75';
        }
    }
}

function placeShips() {
    shipTitle.textContent = 'Carrier';
    initCarrier();
}




// INIT INDIVIDUAL SHIPS
function initCarrier() {
    function place(e) {
        e.preventDefault();
    
        let input = initFire(placeForm);
        let coord = input.slice(0, 2);
        let dir = input.slice(2);
    
        player.board.initShip('Carrier', coord, dir);
        
        for(let i = 0; i < player.board.occupied.length; i++) {
            let name = 'p' + player.board.occupied[i];
            let square = document.getElementsByClassName(name)[0];
            square.style.backgroundColor = 'white';
            square.style.opacity = '0.75';
        }

        placeForm.removeEventListener('submit', place);
        placeForm.addEventListener('submit', placeBat);
        shipTitle.textContent = 'BattleShip';
    }

    placeForm.addEventListener('submit', place);
}

function placeBat(e) {
    e.preventDefault();

    let input = initFire(placeForm);
    let coord = input.slice(0, 2);
    let dir = input.slice(2);

    player.board.initShip('Battleship', coord, dir);
    
    for(let i = 0; i < player.board.occupied.length; i++) {
        let name = 'p' + player.board.occupied[i];
        let square = document.getElementsByClassName(name)[0];
        square.style.backgroundColor = 'white';
        square.style.opacity = '0.75';
    }

    placeForm.removeEventListener('submit', placeBat);
    placeForm.addEventListener('submit', placeDes);
    shipTitle.textContent = 'Destroyer';
}

function placeDes(e) {
    e.preventDefault();

    let input = initFire(placeForm);
    let coord = input.slice(0, 2);
    let dir = input.slice(2);

    player.board.initShip('Destroyer', coord, dir);
    
    for(let i = 0; i < player.board.occupied.length; i++) {
        let name = 'p' + player.board.occupied[i];
        let square = document.getElementsByClassName(name)[0];
        square.style.backgroundColor = 'white';
        square.style.opacity = '0.75';
    }

    placeForm.removeEventListener('submit', placeDes);
    placeForm.addEventListener('submit', placeSub);
    shipTitle.textContent = 'Submarine';
}

function placeSub(e) {
    e.preventDefault();

    let input = initFire(placeForm);
    let coord = input.slice(0, 2);
    let dir = input.slice(2);

    player.board.initShip('Submarine', coord, dir);
    
    for(let i = 0; i < player.board.occupied.length; i++) {
        let name = 'p' + player.board.occupied[i];
        let square = document.getElementsByClassName(name)[0];
        square.style.backgroundColor = 'white';
        square.style.opacity = '0.75';
    }

    placeForm.removeEventListener('submit', placeSub);
    placeForm.addEventListener('submit', placePatrol);
    shipTitle.textContent = 'Patrol Boat';
}

function placePatrol(e) {
    e.preventDefault();

    let input = initFire(placeForm);
    let coord = input.slice(0, 2);
    let dir = input.slice(2);

    player.board.initShip('Patrol Boat', coord, dir);
    
    for(let i = 0; i < player.board.occupied.length; i++) {
        let name = 'p' + player.board.occupied[i];
        let square = document.getElementsByClassName(name)[0];
        square.style.backgroundColor = 'white';
        square.style.opacity = '0.75';
    }

    placeForm.removeEventListener('submit', placePatrol);

    modal.style.display = 'none';
    content.style.filter = 'none';
}


