const initCoords = require("./initCoords");
const transformCoord = require("./transformCoord");


function getShipCoords(start, long, dir) {
    let coords = [];
    
    let first = initCoords(start);
    coords.push(first);

    for (let i = 0; i < long - 1; i++) {
        let last = coords[i];
        let next = transformCoord(last, dir);
        coords.push(next);
    }

    return coords;
}

module.exports = getShipCoords;