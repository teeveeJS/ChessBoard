function announceCrd(input, output, capture, prom){
    //capture === boolean, promotion_out === wQ etc.
    
    var piece = document.getElementById(output).innerHTML.substring(1,2);
    var out = convertCoordinates(output);
    var in1 = convertCoordinates(input);
    last_move = piece + out;
    //console.log(piece + out);
    if(piece === "p" && capture){
        last_move = in1.substring(0,1) + "x" + out;
    } else if (piece === "p"){
        if(document.getElementById(output).innerHTML.substring(0,1) === "w" && out.substring(1,2) === "8"){
            last_move = out + "=" + prom.substring(1,2);
        } else if(document.getElementById(output).innerHTML.substring(0,1) === "b" && out.substring(1,2) === "1"){
            last_move = "(b)" + out + "=" +prom.substring(1,2);
        } else {
            last_move = out;
        };                    
    } else if(capture){
        last_move = piece + "x" + out;
    };

    if(document.getElementById(output).innerHTML.substring(0,1) === "b"){
        last_move = "(b) " + last_move;
    }
    console.log(last_move);
    return last_move;
}