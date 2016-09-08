function updateObjectCrd(){
                for(i=0; i<ps.length; i++){
                    if(!ps[i].isCaptured && ps[i].Alf === parseInt(last_move_start.substring(1,2)) && ps[i].Num === parseInt(last_move_start.substring(0,1))){
                        if(capture){
                            for(j=0; j<ps.length; j++){
                                if(!ps[j].isCaptured && ps[j].Alf === parseInt(last_move_end.substring(1,2)) && ps[j].Num === parseInt(last_move_end.substring(0,1))){
                                    ps[j].isCaptured = true;
                                    //console.log(ps[j].color + ps[j].name + " was captured at " + ps[j].Alf + ps[j].Num);
                                }
                            }
                        } else if(last_move === "0-0"){
                            //updates Rh1
                            ps[21].Alf = 6;
                            //console.log("Piece " + ps[21].name + " updated to " + ps[21].Num + ps[21].Alf);
                        } else if(last_move === "0-0-0"){
                            ps[20].Alf = 4;
                            //console.log("Piece " + ps[20].name + " updated to " + ps[20].Num + ps[20].Alf);
                        } else if(last_move === "b 0-0"){
                            ps[23].Alf = 6;
                            //console.log("Piece " + ps[23].name + " updated to " + ps[23].Num + ps[23].Alf);
                        } else if(last_move === "b 0-0-0"){
                            ps[22].Alf = 4;
                            //console.log("Piece " + ps[22].name + " updated to " + ps[22].Num + ps[22].Alf);
                        }
                        ps[i].Alf = parseInt(last_move_end.substring(1,2));
                        ps[i].Num = parseInt(last_move_end.substring(0,1));
                        //console.log("Piece " + ps[i].name + " updated to " + ps[i].Num + ps[i].Alf);


                        return ps[i];
                    }
                }
            }
            
            function announceCrd(input, output){
                var piece = document.getElementById(output).innerHTML.substring(1,2);
                var out = convertCoordinates(output);
                var in1 = convertCoordinates(input);
                console.log(promotion_out);
                last_move = piece + out;
                //console.log(piece + out);
                if(piece === "p" && capture){
                    last_move = in1.substring(0,1) + "x" + out;
                } else if (piece === "p"){
                    if(document.getElementById(output).innerHTML.substring(0,1) === "w" && out.substring(1,2) === "8"){
                        last_move = out + "=" + promotion_out.substring(1,2);
                    } else if(document.getElementById(output).innerHTML.substring(0,1) === "b" && out.substring(1,2) === "1"){
                        last_move = "(b)" + out + "=" +promotion_out.substring(1,2);
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
