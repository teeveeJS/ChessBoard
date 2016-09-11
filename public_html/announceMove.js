function announceMove(input, output, capture, prom, castle, num){
    //capture === boolean, promotion_out === wQ etc.
    
    var piece = document.getElementById(output).innerHTML.substring(1,2);
    var out = convertCoordinates(output);
    var in1 = convertCoordinates(input);
    var move = piece + out;
    if(piece === "p" && capture){
        move = in1.substring(0,1) + "x" + out;
    } else if (piece === "p"){
        if(document.getElementById(output).innerHTML.substring(0,1) === "w" && out.substring(1,2) === "8"){
            move = out + "=" + prom.substring(1,2);
        } else if(document.getElementById(output).innerHTML.substring(0,1) === "b" && out.substring(1,2) === "1"){
            move = "(b)" + out + "=" + prom.substring(1,2);
        } else {
            move = out;
        };                    
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
    }

    if(document.getElementById(output).innerHTML.substring(0,1) === "w"){
        move = String(num) + ". " + move;
    } else {
        move = move + "<br/>";
    }
    return move;
}