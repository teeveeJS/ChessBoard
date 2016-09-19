var ps = [];
var piece_selected = false;
var move_white = true;
var init_square;
var move_number = 0;
var last_move = "";
var actual_move = "";
var move_list = [];

//for promotion
var button1, button2, button3, button4;
var hasPromoted = true;
var pr;

//for castling
var Ra1_moved = false, Rh1_moved = false, Ra8_moved = false, Rh8_moved = false;
var Ke1_moved = false, Ke8_moved = false;
var castle;
var white_castle, black_castle = false;

//special cases
var capture = false;
var ep = false;

//checkCheck
var poswK = "15";
var posbK = "85";