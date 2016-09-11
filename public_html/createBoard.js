function createBoard() {
    for (h = 1; h < 9; h++) {
        for (i = 1; i < 9; i++) {
            var temp = document.createElement("DIV");
            document.body.appendChild(temp);
            var divID = String(9-h) + String(i);
            temp.innerHTML = "";
            temp.setAttribute("id", divID);
            colorSquare(divID);
            temp.style.fontSize = "0px";
            temp.style.width = "40px";
            temp.style.height = "40px";
            temp.style.position = "absolute";
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