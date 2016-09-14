function checkCheck(toMove, poswK, posbK){
    //toMove could be replaced by using the public boolean move_white
    //pieces.js might come in handy when determining poswK and posbK
    for (h = 1; h < 9; h++){
        for (i = 1; i < 9; i++){
            var id = String(h) + String(i);
            if(toMove){
                if(isLegal(posbK, id)){
                    console.log('check');
                 //   return true;
                } else {
                    
                };
            } else {
                if(isLegal(poswK, id)){
                    console.log('check');
                   // return true;
                };
            }
        }
    }
};