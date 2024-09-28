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
        // for (let i = 0; i < string.length; i++) {
        //     if (letter.test(string[i])) {
        //         let L = string[i].toUpperCase();
        //         coord.push(L);
        //     }
        // }
        coord.push(string[0]);
        coord.push(string.slice(1));
    
        // to control for 10 from being separated
        // console.log('initCoord: ', coord);
        return coord;
    }

    // Based on direction, transforms a coordinate
    // into the coordinate directly next in specified
    // direction; IF coords reach edge, next coord wraps
    // around board
    transformCoord(start, dir) {
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let m = letters.indexOf(start[0]);
        let n = start[1];

        // console.log('transform coord: ', start);
       
        switch (dir) {
            case 'left':
                n--;
                break;
            case 'right':
                if (n < 10) n++;
                else n = 1;
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
                console.log('err transformCoord: Direction invalid', dir);
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
        occ = occ.replace(',', '');


        
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
            occ1 = occ1.replace(',', '');
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
                console.log('err board.initShip: Ship Name invalid');
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

    // if received coordinates match a ship's coordinates,
    // push coordinate to ship hits and board hits, else
    // push coordinate to board misses
    receiveAttack(coordinate) {
        let coord = coordinate.toString();
        let test;
        
        for (let i = 0; i < this.ships.length; i++) {
            // cycle through ships
            for(let j = 0; j < this.ships[i].coordinates.length; j++) {
                // cycle through a ship's coordinates
                let ref = this.ships[i].coordinates[j].toString();
                ref = ref.replace(',', '');
                
                if (coord === ref) {
                    test = true;
                    this.hits.push(coord);
                    this.ships[i].hits.push(coord);
                    // check all ships for sunk after evaluating hit
                    this.ships[i].isSunk();
                    // return true;
                }
            }
            // check all ships for sunk after evaluating hit
            this.ships[i].isSunk();
        }

        if(!test) this.misses.push(coord);
        return test;
    }

    // checks if all ships.sunk === true
    // runs isSunk() on all ships
    checkSunk() {
        let check = 0;

        for (let i = 0; i < this.ships.length; i++) {
            let sink = this.ships[i].isSunk();
            if (sink) check++;
        }

        if (check === this.ships.length) {
            this.sunk = true;
            return true;
            console.log('You lose');
        } else {
            this.sunk = false;
            return false;
        }
    }
}


