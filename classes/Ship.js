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

    // Takes in array coordinate and converts to string
    // for equality testing; converts coordinates to string
    // & compares received coordinate to hits & 
    // ship coordinates;
    // if (!hits.include && coordinates.includes), 
    // adds coordinate to hits and returns true,
    // else returns false
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

        this.isSunk();
        return hit;
        // returns both true and false. Why?
    }

    
    isSunk() {
        this.sunk = this.hits.length >= this.length;
        return this.sunk;
    }
}