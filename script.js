
const board = new Gameboard();
board.initShip('Battleship', ['B', 2], 'down');
board.initShip('Patrol Boat', ['A', 1], 'right');

console.log(board);

board.receiveAttack(['C', 2]);
board.receiveAttack(['D', 2]);
console.log(board);
