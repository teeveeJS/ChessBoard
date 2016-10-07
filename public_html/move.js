function move(event) {
    event.stopPropagation();
    divId = event.target.id.substring(0,2);
    var x = document.getElementById(divId).innerHTML;
    var correct_turn = false;
    ep = false;
    capture = false;
    castle = "";

    if(!piece_selected && hasPromoted){
        if(x.substring(0,1) === "w" && move_white || x.substring(0,1) === "b" && !move_white){
            correct_turn = true;
        } else if(x !== "" || !hasPromoted){
            alert("Tata pelia pelataan vuoretellen! - K.K.");
        }
    }

    if(!piece_selected && correct_turn && x !== ""){
        //the square is clicked for the first time
        document.getElementById(divId).style.backgroundColor = "red";
        piece_selected = true;
        init_square = divId;
    } else if(divId === init_square){
        //the square is clicked for the second time (no move is made)
        colorSquare(init_square);
        piece_selected = false;
        init_square = "";
    } else if(piece_selected && isLegal(divId, init_square)){
        /*
        if(move_white && !checkCheck()[0] || !move_white && !checkCheck()[1]){
            movePieces();
        }*/
        movePieces();
    }
};

function movePieces(){
    //a legal move has been made
    if(ep){
        document.getElementById(last_move.substring(2,4)).innerHTML = "";
        console.log("en passant");
    } else if(castle === "b00"){
        document.getElementById("88").innerHTML = "";
        document.getElementById("86").innerHTML = "bR";
        setImage("86");
    } else if(castle === "b000"){
        document.getElementById("81").innerHTML = "";
        document.getElementById("84").innerHTML = "bR";
        setImage("84");
    } else if(castle === "w00"){
        document.getElementById("18").innerHTML = "";
        document.getElementById("16").innerHTML = "wR";
        setImage("16");
    } else if(castle === "w000"){
        document.getElementById("11").innerHTML = "";
        document.getElementById("14").innerHTML = "wR";
        setImage("14");
    }
    document.getElementById(divId).innerHTML = document.getElementById(init_square).innerHTML.substring(0,2);                
    document.getElementById(init_square).innerHTML = "";
    setImage(divId);
    //changes the square back from reds
    colorSquare(init_square);



    //determines if the kings or the rooks have moved
    if(divId === "11" || init_square === "11"){
        Ra1_moved = true;
    } else if(divId === "18" || init_square === "18"){
        Rh1_moved = true;
    } else if(divId === "81" || init_square === "81"){
        Ra8_moved = true;
    } else if(divId === "88" || init_square === "88"){
        Rh8_moved = true;
    } else if(init_square === "15" || divId === "15"){
        Ke1_moved = true;
    } else if(init_square === "85" || divId === "85"){
        Ke8_moved = true;
    }

    last_move = init_square + divId;

    if(move_white){
        move_number++;
    }
    actual_move = announceMove(init_square, divId, capture, pr, castle, move_number);
    document.getElementById("moves").innerHTML += " "+actual_move;

    checkCheck();
    
    move_white = !move_white;
    piece_selected = false;
}