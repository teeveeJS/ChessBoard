function announceMove(input, output, capture, prom, castle, num){
    //capture === boolean, promotion_out === wQ etc.
    
    var piece = document.getElementById(output).innerHTML.substring(1,2);
    var out = convertCoordinates(output);
    var in1 = convertCoordinates(input);
    var move = piece + out;
    if(piece === "p" && capture){
        move = in1.substring(0,1) + "x" + out;
    } else if(piece === "p"){
        move = out;
    } else if(capture){
        move = piece + "x" + out;
    };
    if(piece === "p" && out.substring(1,2) === "8" || out.substring(1,2) === "1"){
        move = "";
    }
    
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
    } else if(move !== ""){
        move = move + "<br/>";
    }
    console.log(move);
    return move;
}