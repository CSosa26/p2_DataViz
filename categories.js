function optionRice() {
    if(!animBoxCheck){
      animBoxCheck = true;
      bt_Maize.hide();
      bt_Beans_Red.hide();
    } else {
      animBoxCheck = false;
      bt_Maize.show();
      bt_Beans_Red.show();
    }
    choice_cat = 1;
}
  
function optionMaize() {
    if(!animBoxCheck){
      animBoxCheck = true;
      bt_Rice.hide();
      bt_Beans_Red.hide();
    } else {
      animBoxCheck = false;
      bt_Rice.show();
      bt_Beans_Red.show();
    }
    choice_cat = 2;
}
  
function optionBeansRed() {
    if(!animBoxCheck){
      animBoxCheck = true;
      bt_Rice.hide();
      bt_Maize.hide();
    } else {
      animBoxCheck = false;
      bt_Rice.show();
      bt_Maize.show();
    }
    choice_cat = 3;
}