class Ship {
    constructor ({length, coordinates, name}) {
        this.length = length
        // Make this.hits an updating array of 
        // coordinates?
        this.hits = [];
        this.coordinates = coordinates;
        this.name = name;
        this.sunk = false;
    }

    receiveHit(coordinate) {
        let coord = coordinate.toString();
        let hit = false;

        for (let i = 0; i < this.coordinates.length; i++) {
            let ref = this.coordinates[i].toString();

            if (coord === ref && !this.hits.includes(coord)) {
                this.hits.push(coord);
                hit = true;
            }
        }

        return hit;
    }

    isSunk() {
        this.sunk = this.hits.length >= this.length;
        return this.hits.length >= this.length;
    }
}


let ships = [];


const destroyer = new Ship({
    length: 3,
    name: 'Destroyer',
    coordinates: [['A', 4],['B', 4],['C', 4]]
});
const patrolBoat = new Ship({
    length: 2,
    name: 'Patrol Boat',
    coordinates: [['D', 7],['D', 6]]
});
patrolBoat.hits.push('D,6');
const sub = new Ship({
    length: 4,
    name: 'Submarine',
    coordinates: [['A', 4],['B', 4],['C', 4],['D', 4]]
});
sub.hits.push('B,4');
sub.hits.push('D,4');

ships.push(destroyer, patrolBoat, sub);


module.exports = ships;




