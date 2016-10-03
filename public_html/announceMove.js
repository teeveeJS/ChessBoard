function announceMove(input, output, capture, prom, castle, num){    
    var piece = document.getElementById(output).innerHTML.substring(1,2);
    var out = convertCoordinates(output);
    var move = piece + out;
    if(prom){
        move = "";
        //"does nothing"; adding move to the list is handled by the promote function in isLegal.js
    } else if(piece === "p" && capture){
        move = convertCoordinates(input).substring(0,1) + "x" + out;
    } else if(piece === "p"){
        move = out;
    } else if(capture){
        move = piece + "x" + out;
    };
    
    switch(castle){
        case "w00" || "b00":
            move = "0-0";
            break;
        case "w000" || "b000":
            move = "0-0-0";
            break;
        default: null;
    };
    
    if(move !== ""){
        move_list.push(move);
        //pushes unformated moves to an array
        //for .pgn purposes
    };
    
    if(document.getElementById(output).innerHTML.substring(0,1) === "w"){
        move = String(num) + ". " + move;
    } else if(move !== ""){
        move = move + "<br/>";
    };
    //console.log(move);
    return move;
}