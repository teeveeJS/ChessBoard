function checkCheck(toMove, pos_wK, pos_bK){
    var check_w = false;
    var check_b = false;
    for (var h = 1; h < 9; h++){
        for (var i = 1; i < 9; i++){
            var id = String(h) + String(i);
            if(toMove){
                if(isLegal(pos_bK, id)){
                    console.log('check');
                    check_w = true;
                }
            } else {
                if(isLegal(pos_wK, id)){
                    console.log('check');
                    check_b = true;
                }
            }
        }
    }
    return [check_w, check_b];
};