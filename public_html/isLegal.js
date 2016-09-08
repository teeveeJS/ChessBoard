function isLegal(id, init) {
    var end = document.getElementById(id).innerHTML;
    var start = document.getElementById(init).innerHTML;
    if(end.substring(0,1) === start.substring(0,1)){
        return false;
    }
    switch(start.substring(1,2)){
        case "R":
            return isLegalRook(id, init);
        case "B":
            return isLegalBishop(id, init);
        case "N":
            return isLegalKnight(id, init);
        case "Q":
            return isLegalRook(id, init) || isLegalBishop(id, init);
        case "K":
            return isLegalKing(id, init);
        case "p":
            return isLegalPawn(id, init);
    }
}

function isLegalRook(id, init){
    var startInt = parseInt(init);
    var endInt = parseInt(id);
    var legal = true;
    capture = false;
    console.log("checking from " + startInt + " to " + endInt);
    if(init.substring(0,1) === id.substring(0,1)){
        //rank
        //checks if ther are any pieces on the way to the final square
        var distance = endInt - startInt;
        //positive direction
        if(distance>0){
            for(i=1; i<distance; i++){
            console.log("checking square " + String(startInt+i));
                if(document.getElementById(String(startInt+i)).innerHTML !== ""){
                    legal = false;
                }
            }
        }
        //negative direction
        if(distance<0){
            for(i=-1; i>distance; i--){
            console.log("checking square " + String(startInt+i));
                if(document.getElementById(String(startInt+i)).innerHTML !== ""){
                    legal = false;
                }
            }
        }
    } else if(init.substring(1,2) === id.substring(1,2)){
        //file
        var d = (endInt - startInt)/10;
        //positive direction
        if(d>0){
            for(var i=1; i<d; i++){
                var square = String(startInt + i*10);
                //console.log(square);
                if(document.getElementById(square).innerHTML !== ""){
                    legal = false;
                }
            }
        }
        //negative direction
        else {
            for(var i=-1; i>d; i--){
                var square = String (startInt + i*10);
                if(document.getElementById(square).innerHTML !== ""){
                    legal = false;
                }
            }
        }
    } else {
        legal = false;
    }
    if(legal && document.getElementById(id).innerHTML.substring(0,1) === "b" && move_white || document.getElementById(id).innerHTML.substring(0,1) === "w" && !move_white){
        capture = true;
    }
    return legal;
}

function isLegalBishop(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
    var legal = true;
    if(Math.abs(endAlph - startAlph) !== Math.abs(endNum - startNum)){
        legal = false;
    }
    var rankMultiplier;
    var fileMultiplier;
    if(endAlph > startAlph){
        rankMultiplier = 1;
    } else {
        rankMultiplier = -1;
    }
    if(endNum > startNum){
        fileMultiplier = 1;
    } else {
        fileMultiplier = -1;
    }
    for(i=1; i<Math.abs(endAlph-startAlph); i++){
        var temp = (startNum+i*fileMultiplier)*10 + startAlph+i*rankMultiplier;
        if(document.getElementById(String(temp)).innerHTML !== ""){
            legal = false;
        }
    }
    if(legal && document.getElementById(id).innerHTML.substring(0,1) === "b" && move_white || document.getElementById(id).innerHTML.substring(0,1) === "w" && !move_white){
        capture = true;
    }
    return legal;
}

function isLegalKnight(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
    var legal = false;
    if(Math.abs(endAlph-startAlph) === 2 && Math.abs(endNum-startNum) === 1 || Math.abs(endAlph-startAlph) === 1 && Math.abs(endNum-startNum) === 2){
        legal = true;
    }
    if(legal && document.getElementById(id).innerHTML.substring(0,1) === "b" && move_white || document.getElementById(id).innerHTML.substring(0,1) === "w" && !move_white){
        capture = true;
    }
    return legal;
}

function isLegalKing(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
    var legal = false;
    if(Math.abs(endAlph-startAlph) === 1 || Math.abs(endNum-startNum) === 1){
        legal = true;
        //does not take checks into account
    }
    //castling logic
    if(!Ke8_moved && !Rh8_moved && endAlph === 7 && endNum === 8 && isLegalRook("86", "88")){
        document.getElementById("88").innerHTML = "";
        document.getElementById("86").innerHTML = "bR";
        Ke8_moved = true;
        Rh8_moved = true;
        black_castle = true;
        legal = true;
    } else if(!Ke8_moved && !Ra8_moved && endAlph === 3 && endNum === 8 && isLegalRook("84", "81")){
        document.getElementById("81").innerHTML = "";
        document.getElementById("84").innerHTML = "bR";
        Ke8_moved = true;
        Ra8_moved = true;
        black_castle = true;
        legal = true;
    } else if(!Ke1_moved && !Rh1_moved && endAlph === 7 && endNum === 1 && isLegalRook("16", "18")){
        document.getElementById("18").innerHTML = "";
        document.getElementById("16").innerHTML = "wR";
        Ke1_moved = true;
        Rh1_moved = true;
        white_castle = true;
        legal = true;
    } else if(!Ke1_moved && !Ra1_moved && endAlph === 3 && endNum === 1 && isLegalRook("14", "11")){
        document.getElementById("11").innerHTML = "";
        document.getElementById("14").innerHTML = "wR";
        Ke1_moved = true;
        Ra1_moved = true;
        white_castle = true;
        legal = true;
    }
    if(legal && document.getElementById(id).innerHTML.substring(0,1) === "b" && move_white || document.getElementById(id).innerHTML.substring(0,1) === "w" && !move_white){
        capture = true;
    }
    return legal;
}

function isLegalPawn(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
    var output = document.getElementById(id).innerHTML;
    capture = false;
    ep = false;
    var legal = false;

    //white pawn
    if(document.getElementById(init).innerHTML.substring(0,1) === "w"){
        //if the pawn moves only 1 square
        if(endNum - startNum === 1){
            if(Math.abs(endAlph - startAlph) === 1){
                if(output.substring(0,1) === "b"){
                    capture = true;
                    legal = true;
                } else if(output.substring(0,1) === ""){
                    //en passant white
                    capture = true;
                    ep = true;
                    legal = true;
                }
            } else if(endAlph === startAlph){
                if(output.substring(0,1) === ""){
                    legal = true;
                }
            }
        //if the pawn moves 2 squares
        } else if(endNum - startNum === 2 && startNum === 2){
            if(endAlph - startAlph === 0){
                if(document.getElementById(String(parseInt(id)-10)).innerHTML === "" && output === ""){
                    legal = true;
                }                            
            }
        }
        if(endNum === 8 && legal){
            promotion(init, id);
        }
    //black pawn
    } else if(document.getElementById(init).innerHTML.substring(0,1) === "b"){
        //moves only 1 square (down)
        if(endNum - startNum === -1){
            //capture
            if(Math.abs(endAlph - startAlph) === 1){
                if(output.substring(0,1) === "w"){
                    capture = true;
                    legal = true;
                } else if(last_move_end.substring(0,1) === "4" && Math.abs(parseInt(last_move_end.substring(1,2)) - startAlph) === 1 && document.getElementById(last_move_end).innerHTML === "wp"){
                    capture = true;
                    ep = true;
                    legal = true;
                }
            //is the pawn blocked?
            } else if(endAlph === startAlph){
                if(output.substring(0,1) === ""){
                    legal = true;
                }
            }
        //if the pawn moves 2 squares (down)
        } else if(endNum - startNum === -2 && startNum === 7){
            if(endAlph - startAlph === 0){
                if(document.getElementById(String(parseInt(id)+10)).innerHTML === "" && output === ""){
                    legal = true;
                }
            }
        }
        if(endNum === 1 && legal){
            promotion(init, id);
        }
    }

    return legal;
}

function promotion(in_square, out_square){
    alert("promotion");
    button1 = document.createElement("BUTTON");
    button1.setAttribute("id", out_square+"Q");
    button1.innerHTML = "Q"+convertCoordinates(out_square);
    button1.addEventListener("click", promote);
    document.body.appendChild(button1);

    button2 = document.createElement("BUTTON");
    button2.setAttribute("id", out_square+"R");
    button2.innerHTML = "R"+convertCoordinates(out_square);
    button2.addEventListener("click", promote);
    document.body.appendChild(button2);

    button3 = document.createElement("BUTTON");
    button3.setAttribute("id", out_square+"B");
    button3.innerHTML = "B"+convertCoordinates(out_square);
    button3.addEventListener("click", promote);
    document.body.appendChild(button3);

    button4 = document.createElement("BUTTON");
    button4.setAttribute("id", out_square+"N");
    button4.innerHTML = "N"+convertCoordinates(out_square);
    button4.addEventListener("click", promote);
    document.body.appendChild(button4);

    has_clicked_button = false;

    function promote(event){
        var btn = event.srcElement;
        var rank = parseInt(btn.id.substring(0,1));
        var file = parseInt(btn.id.substring(1,2));
        promotion_out = document.getElementById(btn.id.substring(0,2)).innerHTML + btn.id.substring(0,2).innerHTML;
        promote = true;
        //console.log("rank " + rank + " file " + file);
        if(rank === 8){
            document.getElementById(btn.id.substring(0,2)).innerHTML = "w" + btn.innerHTML.substring(0,1);
            //singleUpdateCrd(in_square, out_square);
            move_white = false;
        } else {
            document.getElementById(btn.id.substring(0,2)).innerHTML = "b" + btn.innerHTML.substring(0,1);
            ps[ps.length] = new CP(btn.innerHTML.substring(0,1), "b", file, rank);
            move_white = true;
        }
        document.body.removeChild(button1);
        document.body.removeChild(button2);
        document.body.removeChild(button3);
        document.body.removeChild(button4);
        has_clicked_button = true;
        return move_white;
    }
}



