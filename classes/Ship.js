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