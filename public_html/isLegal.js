function isLegal(id, init) {
    var end = document.getElementById(id).innerHTML;
    var start = document.getElementById(init).innerHTML;
	var x;
    if (end.substring(0,1) === start.substring(0,1)){
        //checks if player tried to capture own piece
        return false;
    }
    if(start === null){
        return false;
    }
    switch(start.substring(1,2)){
        case "R":
            x = isLegalRook(id, init);
			break;
        case "B":
            x = isLegalBishop(id, init);
			break;
        case "N":
            x = isLegalKnight(id, init);
			break;
        case "Q":
            x = isLegalRook(id, init) || isLegalBishop(id, init);
			break;
        case "K":
            x = isLegalKing(id, init);
			break;
        case "p":
            x = isLegalPawn(id, init);
			break;
    }
	return x;
}

function isLegalRook(id, init){
    var startInt = parseInt(init);
    var endInt = parseInt(id);
    var legal = true;
    //console.log("checking from " + startInt + " to " + endInt);
    if(init.substring(0,1) === id.substring(0,1)){
        //rank
        //checks if there are any pieces on the way to the final square
        var distance = endInt - startInt;
        //positive direction
        if(distance>0){
            for(i=1; i<distance; i++){
            //console.log("checking square " + String(startInt+i));
                if(document.getElementById(String(startInt+i)).innerHTML !== ""){
                    legal = false;
					break;
                }
            }
        }
        //negative direction
        if(distance<0){
            for(i=-1; i>distance; i--){
            //console.log("checking square " + String(startInt+i));
                if(document.getElementById(String(startInt+i)).innerHTML !== ""){
                    legal = false;
					break;
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
					break;
                }
            }
        }
        //negative direction
        else {
            for(var i=-1; i>d; i--){
                var square = String (startInt + i*10);
                if(document.getElementById(square).innerHTML !== ""){
                    legal = false;
					break;
                }
            }
        }
    } else {
        legal = false;
    }
    capture = isCapture(legal, id);
    return legal;
}

function isLegalBishop(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
    var legal = Math.abs(endAlph - startAlph) === Math.abs(endNum - startNum);
	if(!legal){
		return false;
	}
	var rankMultiplier = Math.sign(endAlph - startAlph);
	var fileMultiplier = Math.sign(endNum - startNum);
	for(i=1; i<Math.abs(endNum-startNum); i++){
		if(document.getElementById(String(startNum+i*fileMultiplier) + String(startAlph+i*rankMultiplier)).innerHTML !== ""){
			legal = false;
			break;
		}
	}
    capture = isCapture(legal, id);
    return legal;
}

function isLegalKnight(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
	
    var legal = (Math.abs(endAlph-startAlph) === 2 && Math.abs(endNum-startNum) === 1
				|| Math.abs(endAlph-startAlph) === 1 && Math.abs(endNum-startNum) === 2); 
    capture = isCapture(legal, id);
	
    return legal;
}

function isLegalKing(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
    var color  = document.getElementById(init).innerHTML.substring(0,1);
    var legal = false;
    if(Math.abs(endAlph-startAlph) <= 1 && Math.abs(endNum-startNum) <= 1){
        legal = true;
        //does not take checks into account
    }
    //castling logic
    if(Math.abs(endAlph - startAlph) === 2 && checkCastle(id)){
        legal = true;
    }
    if(legal){
        if(color === "w"){
            poswK = id;
        } else {
            posbK = id;
        }
    }
    capture = isCapture(legal, id);
    return legal;
}

function isLegalPawn(id, init){
    var startAlph = parseInt(init.substring(1,2));
    var startNum = parseInt(init.substring(0,1));
    var endAlph = parseInt(id.substring(1,2));
    var endNum = parseInt(id.substring(0,1));
    var output = document.getElementById(id).innerHTML;
    var legal = false;
    
    //white pawn
    if(document.getElementById(init).innerHTML.substring(0,1) === "w"){
        //if the pawn moves only 1 square
        if(endNum - startNum === 1){
            if(Math.abs(endAlph - startAlph) === 1){
                if(output.substring(0,1) === "b"){
                    capture = true;
                    legal = true;
                } else if(output.substring(0,1) === "" && last_move.substring(2,3) === "5" && document.getElementById(last_move.substring(2,4)).innerHTML.substring(0,2) === "bp"){
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
        } else if(endNum - startNum === 2 && startNum === 2 && endAlph - startAlph === 0 && document.getElementById(String(parseInt(id)-10)).innerHTML === "" && output === ""){
            legal = true;
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
                } else if(output.substring(0,1) === "" && last_move.substring(2,3) === "4" && document.getElementById(last_move.substring(2,4)).innerHTML.substring(0,2) === "wp"){
                    capture = true;
                    ep = true;
                    legal = true;
                }
            //is the pawn blocked?
            } else if(endAlph === startAlph){
                legal = (output.substring(0,1) === "");
            }
        //if the pawn moves 2 squares (down)
        } else if(endNum - startNum === -2 && startNum === 7){
            if (endAlph - startAlph === 0){
                legal = (document.getElementById(String(parseInt(id)+10)).innerHTML === "" && output === "");
            }
        }        
    }    
    if(startNum === 2 && endNum === 1 || startNum === 7 && endNum === 8 && legal){
        pr = true;
        promotion(id, init);
    }    
    return legal;
}

function promotion(out_square, in_square){
    alert("promotion");
    button1 = document.createElement("BUTTON");
    button1.setAttribute("id", out_square+"Q");
    button1.innerHTML = "Q"+convertCoordinates(out_square);
    button1.style.marginLeft = "40px";
    button1.addEventListener("click", promote);
    document.body.appendChild(button1);

    button2 = document.createElement("BUTTON");
    button2.setAttribute("id", out_square+"R");
    button2.innerHTML = "R"+convertCoordinates(out_square);
    button2.style.marginLeft = "80px";
    button2.addEventListener("click", promote);
    document.body.appendChild(button2);

    button3 = document.createElement("BUTTON");
    button3.setAttribute("id", out_square+"B");
    button3.innerHTML = "B"+convertCoordinates(out_square);
    button3.style.marginLeft = "120px";
    button3.addEventListener("click", promote);
    document.body.appendChild(button3);

    button4 = document.createElement("BUTTON");
    button4.setAttribute("id", out_square+"N");
    button4.innerHTML = "N"+convertCoordinates(out_square);
    button4.style.marginLeft = "160px";
    button4.addEventListener("click", promote);
    document.body.appendChild(button4);

    hasPromoted = false;
    
    function promote(event){
        var btn = event.target;
        if(btn.id.substring(0,1) === "8"){
            document.getElementById(btn.id.substring(0,2)).innerHTML = "w" + btn.innerHTML.substring(0,1);
            //pr = "w" + btn.innerHTML.substring(0,1);
        } else {
            document.getElementById(btn.id.substring(0,2)).innerHTML = "b" + btn.innerHTML.substring(0,1);
            //pr = "b" + btn.innerHTML.substring(0,1);
        }
        setImage(btn.id.substring(0,2));
        var move = (capture) ? convertCoordinates(in_square).substring(0,1) + "x" + convertCoordinates(btn.id.substring(0,2)) + "=" + btn.innerHTML.substring(0,1) :
                                move_number + ". " + convertCoordinates(btn.id.substring(0,2)) + "=" + btn.innerHTML.substring(0,1);
        document.getElementById("moves").innerHTML += move;
        document.body.removeChild(button1);
        document.body.removeChild(button2);
        document.body.removeChild(button3);
        document.body.removeChild(button4);
        hasPromoted = true;
    }
}

function checkCastle(end_square){
    //console.log('checking castle');
    var endAlph = parseInt(end_square.substring(1,2));
    var endNum = parseInt(end_square.substring(0,1));
    
    if(!Ke8_moved && !Rh8_moved && endAlph === 7 && endNum === 8 && isLegalRook("85", "88")){
        Ke8_moved = true;
        Rh8_moved = true;
        black_castle = true;
        castle = "b00";
        return true;
    } else if(!Ke8_moved && !Ra8_moved && endAlph === 3 && endNum === 8 && isLegalRook("85", "81")){
        Ke8_moved = true;
        Ra8_moved = true;
        black_castle = true;
        castle = "b000";
        return true;
    } else if(!Ke1_moved && !Rh1_moved && endAlph === 7 && endNum === 1 && isLegalRook("15", "18")){
        Ke1_moved = true;
        Rh1_moved = true;
        white_castle = true;
        castle = "w00";
        return true;
    } else if(!Ke1_moved && !Ra1_moved && endAlph === 3 && endNum === 1 && isLegalRook("15", "11")){
        Ke1_moved = true;
        Ra1_moved = true;
        white_castle = true;
        castle = "w000";
        return true;
    } else {
        return false;
    }
}

function isCapture(legal, id){
    return (legal && document.getElementById(id).innerHTML.substring(0,1) !== "");
}