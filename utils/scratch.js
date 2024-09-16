    // Takes in array coordinate and converts to string
    // for equality testing; converts coordinates to string
    // & compares received coordinate to hits & 
    // ship coordinates;
    // if (!hits.include && coordinates.includes), 
    // adds coordinate to hits and returns true,
    // else returns false
    receiveHit(coordinate) {
        let coord = coordinate.toString();
        let hit = [];

        for (let i = 0; i < this.coordinates.length; i++) {
            let ref = this.coordinates[i].toString();

            if (coord === ref && !this.hits.includes(coord)) {
                hit.push(true);
                this.hits.push(coord);
            } else hit.push(false);
        }
           
        this.isSunk();
        
        if (hit.includes(true)) return true;
        else return false;
        // returns both true and false. Why?
    }




        // cycles through ships, calling 
    // ship.receiveHit(); if hit === true,
    // pushes coordinate to hits, else to misses
    receiveAttack(coordinate) {

        for (let i = 0; i < this.ships.length; i++) {
            let hit = this.ships[i].receiveHit(coordinate);
            // logs as both true and false; why?
            console.log(hit);
            if (hit) this.hits.push(coordinate);
            else if(hit === false) this.misses.push(coordinate);
        }

    }