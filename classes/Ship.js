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
    
    isSunk() {
        this.sunk = this.hits.length >= this.length;
        return this.sunk;
    }
}

