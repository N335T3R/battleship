function initCoords(string) {
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

module.exports = initCoords;