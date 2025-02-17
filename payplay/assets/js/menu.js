isStrata = true;

function strata(){
    if(isStrata == true){
      $('#sideMenu').css({'transform': 'translate(300px)'});
      $('#menuBackground').fadeIn();
      // $('#vu-meter').hide();
      vuMeterShowByMenu('hide');

    }
    else if(isStrata == false){
      $('#sideMenu').css({'transform': 'translate(-1px)'});
      $('#menuBackground').fadeOut();
      // $('#vu-meter').show();
      vuMeterShowByMenu('show');
    };
    isStrata = !isStrata;
}
