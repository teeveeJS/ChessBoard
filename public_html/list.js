function listAllContent(){
                for(i=0; i<89; i++){
                    if(document.getElementById(String(i)) !== null){
                        console.log(String(i) + ": " + document.getElementById(String(i)).innerHTML);
                    } else {
                        console.log(String(i) + " is undefined");
                    }
                }
            }
            function listObjectPieces(){
                for(i=0; i<ps.length; i++){
                    console.log(ps[i].name + convertCoordinates(String(ps[i].Num) + String(ps[i].Alf)));
                }
            }