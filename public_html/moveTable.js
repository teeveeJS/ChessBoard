function createMoveTable(start_square){
    var moveTable = {};
    for (var h = 1; h < 9; h++){
        for (var i = 1; i < 9; i++){
            var end = String(h) + String(i);
            console.log(end);
            moveTable[end] = isLegal(end, start_square);
        }
    }
    return moveTable;
}

function printMoveTable(start_square){
    var moveTable = createMoveTable(start_square);
    for(var key in moveTable){
        console.log(key + ": " + moveTable[key]);
    }
}