function convertCoordinates(squareId){
    var temp;
    var letterCrd = parseInt(squareId.substring(1,2));
    var numberCrd = squareId.substring(0,1);
    switch(letterCrd){
        case 1: return temp = "a"+numberCrd;
        case 2: return temp = "b"+numberCrd;
        case 3: return temp = "c"+numberCrd;
        case 4: return temp = "d"+numberCrd;
        case 5: return temp = "e"+numberCrd;
        case 6: return temp = "f"+numberCrd;
        case 7: return temp = "g"+numberCrd;
        case 8: return temp = "h"+numberCrd;
        default: return temp = "error";
    }
}