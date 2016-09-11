function changeCursor(){
    for(i=1; i<9; i++){
        for(j=1; j<9; j++){
            var tempID = String(9-i) + String(j);
            document.getElementById(tempID).style.cursor = "default";
        };
    };
};