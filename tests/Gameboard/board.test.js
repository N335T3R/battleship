const initCoords = require("./initCoords");
const getShipCoords = require("./getShipCoords");
const transformCoord = require("./transformCoord");
const initShip = require("./initShip");


describe('initCoords', () => {
    it('lowerCase', () => {
        expect(initCoords('a4')).toEqual(['A', 4]);
     }); 

    it('CAPS', () => {
        expect(initCoords('A4')).toEqual(['A', 4]);
    }); 

    it('commaAndSpace', () => {
        expect(initCoords('A, 4')).toEqual(['A', 4]);
    });

    it('colon', () => {
        expect(initCoords('a:4')).toEqual(['A', 4]);
    });
});


describe('transformCoord', () => {
    it('left1', () => {
        expect(transformCoord(['A', 4], 'left')).toEqual(['A', 3]);
    });

    it('left2', () => {
        expect(transformCoord(['B', 7], 'left')).toEqual(['B', 6]);
    });

    it('right1', () => {
        expect(transformCoord(['B', 7], 'right')).toEqual(['B', 8]);
    });

    it('right2', () => {
        expect(transformCoord(['A', 4], 'right')).toEqual(['A', 5]);
    });

    it('up1', () => {
        expect(transformCoord(['B', 7], 'up')).toEqual(['A', 7]);
    });

    it('up2', () => {
        expect(transformCoord(['I', 5], 'up')).toEqual(['H', 5]);
    });

    it('down1', () => {
        expect(transformCoord(['A', 4], 'down')).toEqual(['B', 4]);
    });

    it('down2', () => {
        expect(transformCoord(['B', 7], 'down')).toEqual(['C', 7]);
    });
});


describe("getShipCoords", () => {
    it('down', () => {
        expect(getShipCoords(['A', 4], 5, 'down')).toEqual([['A', 4],['B', 4],['C', 4],['D', 4],['E', 4]]);
    });

    it('right', () => {
        expect(getShipCoords(['B', 1], 3, 'right')).toEqual([['B', 1],['B', 2],['B', 3]]);
    });

    it('left', () => {
        expect(getShipCoords(['B', 7], 3, 'left')).toEqual([['B', 7],['B', 6],['B', 5]]);
    });

    it('up', () => {
        expect(getShipCoords(['G', 7], 4, 'up')).toEqual([['G', 7],['F', 7],['E', 7], ['D', 7]]);
    });
});


describe('initShip', () => {
    it('patrolBoat', () => {
        expect(initShip('Patrol Boat', 'a1', 'down')).toEqual({
            coordinates: [['A', 1],['B', 1]],
            hits: 0,
            length: 2,
            name: 'Patrol Boat',
            sunk: false
        });
    });

    it('Carrier', () => {
        expect(initShip('Carrier', 'c3', 'right')).toEqual({
            length: 5,
            hits: 0,
            coordinates: [['C', 3],['C', 4],['C', 5],['C', 6],['C', 7]],
            name: 'Carrier',
            sunk: false
        });
    });
});

