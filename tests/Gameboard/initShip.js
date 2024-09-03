const getShipCoords = require("./getShipCoords");
class Ship {
    constructor ({length, coordinates, name}) {
        this.length = length
        // Make this.hits an updating array of 
        // coordinates?
        this.hits = 0;
        this.coordinates = coordinates;
        this.name = name;
        this.sunk = false;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}


function initShip(name, start, dir) {
    let long = 0;

    switch (name) {
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
            console.log('err');
            break;
    }

    let coordinates = getShipCoords(start, long, dir);

    let ship = new Ship({
        length: long,
        name: name,
        coordinates: coordinates
    });

    return ship;
}

module.exports = initShip;


