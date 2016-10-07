function checkCheck(){
    var check_w = false;
    var check_b = false;
    for (var h = 1; h < 9; h++){
        for (var i = 1; i < 9; i++){
            var id = String(h) + String(i);
            if(isLegal(poswK, id)){
                console.log('white king in check from ' + id);
                check_w = true;
            }
            if(isLegal(posbK, id)){
                console.log('black king in check from' + id);
                check_b = true;
            }
        }
    }
    return [check_w, check_b];
};