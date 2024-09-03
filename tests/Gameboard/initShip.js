function initShip(ship, start, dir) {
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
    }
}

module.exports = initShip;


