const ships = require("./receiveHit");



describe('receive Hit', () => {
    it('destroyer', () => {
        expect(ships[0].receiveHit(['C', 4])).toBe(true);
    });

    it('patrolBoat', () => {
        expect(ships[1].receiveHit(['D', 7])).toEqual(true);
    });

    it('sub', () => {
        expect(ships[2].receiveHit('B', 4)).toEqual(false);
    });
});