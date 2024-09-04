class Gameboard {
    constructor () {
        // 10X10 grid of all map coordinates
        this.board = [[['A', 1],['A', 2],['A', 3],['A', 4],['A', 5],['A', 6],['A', 7],['A', 8],['A', 9],['A', 10]],
            [['B', 1],['B', 2],['B', 3],['B', 4],['B', 5],['B', 6],['B', 7],['B', 8],['B', 9],['B', 10]],
            [['C', 1],['C', 2],['C', 3],['C', 4],['C', 5],['C', 6],['C', 7],['C', 8],['C', 9],['C', 10]],
            [['D', 1],['D', 2],['D', 3],['D', 4],['D', 5],['D', 6],['D', 7],['D', 8],['D', 9],['D', 10]],
            [['E', 1],['E', 2],['E', 3],['E', 4],['E', 5],['E', 6],['E', 7],['E', 8],['E', 9],['E', 10]],
            [['F', 1],['F', 2],['F', 3],['F', 4],['F', 5],['F', 6],['F', 7],['F', 8],['F', 9],['F', 10]],
            [['G', 1],['G', 2],['G', 3],['G', 4],['G', 5],['G', 6],['G', 7],['G', 8],['G', 9],['G', 10]],
            [['H', 1],['H', 2],['H', 3],['H', 4],['H', 5],['H', 6],['H', 7],['H', 8],['H', 9],['H', 10]],
            [['I', 1],['I', 2],['I', 3],['I', 4],['I', 5],['I', 6],['I', 7],['I', 8],['I', 9],['I', 10]],
            [['J', 1],['J', 2],['J', 3],['J', 4],['J', 5],['J', 6],['J', 7],['J', 8],['J', 9],['J', 10]]];
        this.hits = [];
        this.misses = [];
        this.occupied = [];
        this.ships = [];
        this.sunk = false;
    }

    // converts string input coordinate to array
    initCoords(string) {
        let coord = [];
        let letter = /\p{L}/u;
        let num = /\d/;
        // Purge all punct & spaces
        for (let i = 0; i < string.length; i++) {
            if (letter.test(string[i])) {
                let L = string[i].toUpperCase();
                coord.push(L);
            }
            if (num.test(string[i])) coord.push(parseInt(string[i]));
        }
    
        return coord;
    }

    // Based on direction, transforms a coordinate
    // into the coordinate directly next in specified
    // direction
    transformCoord(start, dir) {
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let m = letters.indexOf(start[0]);
        let n = start[1];
       
        switch (dir) {
            case 'left':
                n--;
                break;
            case 'right':
                n++;
                break;
            case 'up':
                if (m > 0) m--;
                else m = 9;
                break;
            case 'down':
                if (m < 9) m++;
                else m = 0;
                break;
            default: 
                console.log('err');
                break;
        }
    
        let coord = [letters[m], n];
        return coord;
    }

    // Based on direction and length, takes starting
    // coordinate and populates an array of
    // coordinates to describe ship placement on board
    getShipCoords(start, long, dir) {
        let coords = [];
        // translate start to coordinate array
        let first = this.initCoords(start);
        coords.push(first);
        // stringy coordinates for equality testing
        let occ = first.toString();


        
        // Push start coordinate to occupied 
        // coordinates list
        this.occupied.push(occ);
    
        // Generate remaining squares
        // for ship to occupy base on length & direction
        for (let i = 0; i < long - 1; i++) {
            let last = coords[i];
            let next = this.transformCoord(last, dir);
            coords.push(next);

            // push generated coordinates to occupied 
            // coordinates list
            let occ1 = next.toString();
            this.occupied.push(occ1);
        }
    
        return coords;
    }

    // Takes ship name, starting coordinate, and direction;
    // Creates new Ship() and auto-populates length
    // &  coordinates
    initShip(name, start, dir) {
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
    
        let coordinates = this.getShipCoords(start, long, dir);
    
        let ship = new Ship({
            length: long,
            name: name,
            coordinates: coordinates
        });
    
        this.ships.push(ship);
        return ship;
    }


    // cycles through ships, calling 
    // ship.receiveHit(); if hit === true,
    // pushes coordinate to hits, else to misses
    receiveAttack(coordinate) {
        let hit;

        for (let i = 0; i < this.ships.length; i++) {
            hit = this.ships[i].receiveHit(coordinate);
            // logs as both true and false; why?
        }

        // all received pushing to misses. why?
        if (hit) this.hits.push(coordinate);
        else this.misses.push(coordinate);

        return hit;
    }

    // checks if all ships.sunk === true
    checkSunk() {
        let check = 0;

        for(let i = 0; i < this.ships.length; i++) {
            if(this.ships[i].sunk) check++;
        }

        if (check >= this.ships.length) this.sunk = true;
        else return false;
    }
}
