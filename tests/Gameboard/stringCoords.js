function stringCoord(arr) {
    let string = arr.toString();

    string = string.replaceAll(',', '');
    string = string.replaceAll(' ', '');
    string = string.replace('[', '');
    string = string.replace(']', '');

    return string;
}

module.exports = stringCoord;