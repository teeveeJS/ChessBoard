function createBoard() {
    for (h = 1; h < 9; h++) {
        for (i = 1; i < 9; i++) {
            var temp = document.createElement("DIV");
            document.body.appendChild(temp);
            var divID = String(9-h) + String(i);
            if(i%2 === 0 && h%2 !== 0 || i%2 !==0 && h%2 ===0){
                temp.style.backgroundColor = "gray";
            } else {
                temp.style.backgroundColor = "white";
            }//this could probably also be replaced with colorSquare, just be careful with async
            temp.innerHTML = "";
            temp.setAttribute("id", divID);
            temp.style.fontSize = "6px";
            temp.style.width = "40px";
            temp.style.height = "40px";
            temp.style.position = "absolute";
            //the padding keeps changing the dimensions of the board
            temp.style.marginTop = String(40 * h) + "px";
            temp.style.marginLeft = String(40 * i) + "px";
        };
    };
};
function colorSquare(id){
    if(id.substring(1,2)%2 === 0 && id.substring(0,1)%2 !== 0 || id.substring(1,2)%2 !==0 && id.substring(0,1)%2 ===0){
        document.getElementById(id).style.backgroundColor = "white";
    } else {
        document.getElementById(id).style.backgroundColor = "gray";
    }
}


