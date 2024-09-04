import Gameboard from "../../classes/Gameboard";

const board = new Gameboard();
const patrolBoat = new Ship({
    name: 'Patrol Boat',
    length: 2,
    coordinates: [['A', 1],['A', 2]]
});
board.ships.push(patrolBoat);

describe('receiveAttack', () => {
    it('A1', () => {
        expect(board.receiveAttack(['A', 1])).toBe(true);
    });
}); 

