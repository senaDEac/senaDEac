//
function favContainer (){
  console.log("favContainer");
  favRadioList = window.localStorage.favRadioList;
  favRadioList = JSON.parse(favRadioList);
  for (var key of Object.keys(favRadioList)) {
        if (favRadioList[key] == "test") {
          console.log("testtttttt");
        }
        else {
          $('#favContainer').append('<img src=assets/images/logos/'+favRadioList[key]+'.png class="ImgLogos" onclick="startRadio2(`'+favRadioList[key]+'`)" style="padding:2px; margin:1px;">');
        }
  }
}
