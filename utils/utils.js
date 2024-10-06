// PREPARATORY FUNCIONS
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
function getDir() {
    let die = Math.floor(Math.random() * 10);
    // console.log(die);

    if (die > 5) return 'down';
    else return 'right';
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
            square.textContent = stringCoords(player.board.board[i][j]);
            row.appendChild(square);
    
            square.style.width = '10%';
            square.style.height = '100%';
            square.style.border = '0.01rem solid white';
            square.style.color = 'white';
            square.style.fontSize = '0.75rem';
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
            square.textContent = stringCoords(player.board.board[i][j]);
            row.appendChild(square);
    
            square.style.width = '10%';
            square.style.height = '100%';
            square.style.border = '0.01rem solid white';
            square.style.color = 'white';
            square.style.fontSize = '0.75rem';
        }
    }
}




// TURN-TAKING CODE
function playerTurn(input) {
    // let input = prompt('Enter a coordinate');
    let name = 'e' + input;
    let square = document.getElementsByClassName(name)[0];

    let hit = enemy.board.receiveAttack(input);
    enemy.board.checkSunk();
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
    enemy.board.checkSunk();
    // console.log(hit, enemy.board);

    // without, things happen too fast
    setTimeout(() => {
        if (hit) square.style.backgroundColor = 'red';
        else square.style.backgroundColor = 'cyan';
    }, 1000);

    // console.log(player);
}
function winState() {
    if (enemy.board.sunk) prompt('You win!');
    if (player.board.sunk) prompt('Computer wins.');
}
function takeTurn(input) {
    playerTurn(input);
    setTimeout(enemyTurn, 1000);
    winState();
}





// NEW GAME CODE
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
// Begins a sequence of functions that place
// a ship & append ship to Gameboard, then
// call another ship-placing function
function placeShips() {
    shipTitle.textContent = 'Carrier';
    initCarrier();
}
// INIT INDIVIDUAL SHIPS;
// these functions are called by placeShips()
function initCarrier() {
    function place(e) {
        e.preventDefault();
    
        let input = initFire(placeForm);
        let coord;
        let dir;
        let test = /10/gm;

        if (test.test(input)) {
            coord = input.slice(0, 3);
            dir = input.slice(3);
        } else {
            coord = input.slice(0, 2);
            dir = input.slice(2);
        }
    

        let carrier = player.board.initShip('Carrier', coord, dir);
        player.board.ships.push(carrier);

        for (let i = 0; i < carrier.coordinates.length; i++) {
            let coord = stringCoords(carrier.coordinates[i]);
            player.board.occupied.push(coord);
        }
        
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
    let coord;
    let dir;
    let test = /10/gm;

    if (test.test(input)) {
        coord = input.slice(0, 3);
        dir = input.slice(3);
    } else {
        coord = input.slice(0, 2);
        dir = input.slice(2);
    }

    let battleship = player.board.initShip('Battleship', coord, dir);
    player.board.ships.push(battleship);

    for (let i = 0; i < battleship.coordinates.length; i++) {
        let coord = stringCoords(battleship.coordinates[i]);
        player.board.occupied.push(coord);
    }
    
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
    let coord;
    let dir;
    let test = /10/gm;

    if (test.test(input)) {
        coord = input.slice(0, 3);
        dir = input.slice(3);
    } else {
        coord = input.slice(0, 2);
        dir = input.slice(2);
    }

    let destroyer = player.board.initShip('Destroyer', coord, dir);
    player.board.ships.push(destroyer);
    
    for (let i = 0; i < destroyer.coordinates.length; i++) {
        let coord = stringCoords(destroyer.coordinates[i]);
        player.board.occupied.push(coord);
    }

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
    let coord;
    let dir;

    let test = /10/gm;

    if (test.test(input)) {
        coord = input.slice(0, 3);
        dir = input.slice(3);
    } else {
        coord = input.slice(0, 2);
        dir = input.slice(2);
    }

    let submarine = player.board.initShip('Submarine', coord, dir);
    player.board.ships.push(submarine);
    
    for (let i = 0; i < submarine.coordinates.length; i++) {
        let coord = stringCoords(submarine.coordinates[i]);
        player.board.occupied.push(coord);
    }

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
    let coord;
    let dir;
    let test = /10/gm;

    if (test.test(input)) {
        coord = input.slice(0, 3);
        dir = input.slice(3);
    } else {
        coord = input.slice(0, 2);
        dir = input.slice(2);
    }

    let patrol = player.board.initShip('Patrol Boat', coord, dir);
    player.board.ships.push(patrol);
    
    for (let i = 0; i < patrol.coordinates.length; i++) {
        let coord = stringCoords(patrol.coordinates[i]);
        player.board.occupied.push(coord);
    }

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

function placeEnemyShips() {
    let ships = ['Carrier', 'Battleship', 'Destroyer', 'Submarine', 'Patrol Boat'];

    for (let i = 0; i < ships.length; i++) {
        let coords = testCoords(ships[i]);
        // console.log(coords);
        let start = coords[0];
        let dir = coords[1];
    
        let ship = enemy.board.initShip(ships[i], start, dir);
    }
}

function testCoords(ship) {
    let start = getRandomCoord();
    let dir = getDir();
    let long = 0;

    switch (ship) {
        case 'Carrier':
            long = 5;
            break;
        case 'Battleship':
            long = 4;
            break;
        case 'Destroyer':
            long = 3;
            break;
        case 'Submarine':
            long = 3;
            break;
        case 'Patrol Boat':
            long = 2;
            break;
        default:
            console.log('err board.initShip: Ship Name invalid');
            break;
    }
    // console.log(long);

    let coords = enemy.board.getShipCoords(start, long, dir);
    // console.log(coords);
    let test = false;

    for (let i = 0; i < enemy.board.occupied.length; i++) {
        if (coords.includes(enemy.board.occupied[i])) test = true;
    }

    if (test) {
        testCoords(ship);
    } else {
        let output = [start, dir];
        // console.log(output);
        return output;
    }
    
}

    // initShip
    // check if coordinates are already occupied
        // if true: initShip
        // if false: continue
    // push to occupied and ships



// function that transforms coords and checks 
// occupied before initShip()