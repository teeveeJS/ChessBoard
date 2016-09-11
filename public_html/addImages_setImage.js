function addImages(){
    for (h = 1; h < 9; h++) {
        for (i = 1; i < 9; i++) {
            var divID = String(9-h) + String(i);
            var x = document.getElementById(divID).innerHTML;
            if(x !== "" || x !== undefined || x !== null){
                setImage(divID);
            }
        }
    }
};

function setImage(id){
    var image1 = document.createElement("IMG");
    var z = document.getElementById(id).innerHTML;
    var imID = id+"Image";
    var hasPiece = true;
    image1.setAttribute("height", "40px");
    image1.setAttribute("height", "40px");
    image1.setAttribute("id", imID);
    image1.addEventListener("click", move);
    if(z === "bp"){
        image1.setAttribute("src", "bp.gif");
    } else if(z === "bN"){
        image1.setAttribute("src", "bN.gif");
    } else if(z === "bB"){
        image1.setAttribute("src", "bB.gif");
    } else if(z === "bR"){
        image1.setAttribute("src", "bR.gif");
    } else if(z === "bQ"){
        image1.setAttribute("src", "bQ.gif");
    } else if(z === "bK"){
        image1.setAttribute("src", "bK.gif");
    } else if(z === "wp"){
        image1.setAttribute("src", "wp.gif");
    } else if(z === "wN"){
        image1.setAttribute("src", "wN.gif");
    } else if(z === "wB"){
        image1.setAttribute("src", "wB.gif");
    } else if(z === "wR"){
        image1.setAttribute("src", "wR.gif");
    } else if(z === "wQ"){
        image1.setAttribute("src", "wQ.gif");
    } else if(z === "wK"){
        image1.setAttribute("src", "wK.gif");
    } else {
        hasPiece = false;
    }
    if(hasPiece){
        document.getElementById(id).appendChild(image1);
    }

    return image1;
}

