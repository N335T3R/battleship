function transformCoord(start, dir) {
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


module.exports = transformCoord;