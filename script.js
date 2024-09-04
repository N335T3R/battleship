const ship = new Ship({
    length: 5,
    name: 'carrier',
    coordinates: [['A', 4],['B', 4],['C', 4],['D', 4],['E', 4]]
});
console.log(ship);

let coord = JSON.stringify(ship.coordinates[0]);
console.log(coord);

