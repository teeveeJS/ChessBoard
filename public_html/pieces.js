var ps = new Array();

    function CP(name, color, Alf, Num, isCaptured) {
        this.name = name;
        this.color = color;
        this.Alf = Alf;
        this.Num = Num;
        this.isCaptured = isCaptured;
    };

function createPieces(){
    for (j=0; j<8; j++) {
        ps[j] = new CP("p", "w", j + 1, 2, false);
    };
    for(j=8; j<16; j++){
        var temp = j-8;
        ps[j] = new CP("p", "b", temp + 1, 7, false);
    };
    ps[16] = new CP("K", "w", 5, 1, false);
    ps[17] = new CP("K", "b", 5, 8, false);
    ps[18] = new CP("Q", "w", 4, 1, false);
    ps[19] = new CP("Q", "b", 4, 8, false);
    ps[20] = new CP("R", "w", 1, 1, false);
    ps[21] = new CP("R", "w", 8, 1, false);
    ps[22] = new CP("R", "b", 1, 8, false);
    ps[23] = new CP("R", "b", 8, 8, false);
    ps[24] = new CP("B", "w", 3, 1, false);
    ps[25] = new CP("B", "w", 6, 1, false);
    ps[26] = new CP("B", "b", 3, 8, false);
    ps[27] = new CP("B", "b", 6, 8, false);
    ps[28] = new CP("N", "w", 2, 1, false);
    ps[29] = new CP("N", "w", 7, 1, false);
    ps[30] = new CP("N", "b", 2, 8, false);
    ps[31] = new CP("N", "b", 7, 8, false);
    return ps;
};

function changeIDs(length){
    for(i=0; i<length; i++){
        var pieceID = String(ps[i].Num)+String(ps[i].Alf);
        //console.log(pieceID);
        document.getElementById(pieceID).innerHTML = ps[i].color + ps[i].name;
    };
};


