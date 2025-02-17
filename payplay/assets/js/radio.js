


  // colouquei isso em 3 lugares pra garantir que iria bloquear o VU fake...  que insiste em ficar aparecendo do nada...
  $('#vu-meter_generalB').hide();
    
    
  //
  //  Loading the theme
  //
  theme = window.localStorage.theme;
  //
  console.log("______theme: ", theme  )
  //
  if(theme==false || theme=='' || !theme || theme==false){
    window.localStorage.setItem('theme', 'vovo');
    theme = window.localStorage.theme;
    console.log("______theme: ", theme  )
  };
  //
  //
  loadTheme();
  //
  function loadTheme(){
    if(theme=='apple'){
      $('#radioSpace').load('assets/themes/apple/master.html',report('apple'));
    }
    else if(theme=='pc'){
      $('#radioSpace').load('assets/themes/pc/master.html',report('pc'));
    }
    else if(theme=='vovo'){
      $('#radioSpace').load('assets/themes/vovo/master.html',report('vovo'));
    }
    else if(theme=='boch'){
      $('#radioSpace').load('assets/themes/boch/master.html',report('boch'));
    };
  }
  //
  function report(theme){
    if(theme=='apple'){
      console.log('THEME == Apple');
    }
    else if(theme=='pc'){
      console.log('THEME == PC');
    }
  }
//
// the configs
//
function goConfigs(){
  // $('#oneModalBodyHelp').html(goPrivicyPolicyText);
  $('#modalConfigs').modal({});
}
//
// chosing a new theme
//
function choseTheme(value){
  // window.localStorage.setItem('theme', 'apple');
  window.localStorage.setItem('theme', value);
  //
  theme = window.localStorage.theme;
  //
  // loadTheme();
  // startVU();

    window.location.href = "index.html";
    window.location.reload();
}










// console.log(appVersion);
actualMediaType="";
//
function startRadio(radioIcon, radioName, streamType, StreamUrl){

  // StreamUrl="https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_89FM.mp3"
  console.log('___startRadio: '+StreamUrl )
  //
  //mensagem de procurando a radio
  //
  $('#displaySpinner').show();
  setTimeout(function(){
    $('#displaySpinner').hide();
  }, 3000);
  //
  // parando os players
  //
  video.pause();                                     //  m3u8
  document.getElementById('player_html5') .src = ""; // html5 
  document.getElementById('player_html5B').src = ""; // html5 
  //
  // se nao tiver uma radio, use a radio padrao
  //
  if (!radioIcon){
    radioIcon = window.localStorage.chgRadio;
    radioIcon2 = JSON.parse(radioIcon);
    //
    radioIcon = radioIcon2[1][0];
    radioName = radioIcon2[1][1];
    streamType= radioIcon2[1][2];
    StreamUrl = radioIcon2[1][3];
  };

  //
  // colocando o logo da radio atual
  //
  $('#favRadioLogo').html('<img  class="ImgLogos" src="'+radioIcon+'"  style="" >');
  //
  // escolhendo o player
  //
  if (streamType=='general'){
    document.getElementById('player_html5').src = StreamUrl;
    document.getElementById('player_html5').play();
  }
  if (streamType=='generalB'){


    document.getElementById('player_html5B').src = StreamUrl;
    document.getElementById('player_html5B').play();
  }
  if (streamType=='m3u8'){
    var hls = new Hls();
    hls.loadSource(StreamUrl);
    hls.attachMedia(video);
    video.play();
  }
  //
  window.localStorage.setItem('chgRadio', '{"1": ["'+radioIcon+'", "'+radioName+'", "'+streamType+'", "'+StreamUrl+'"]}');
  // window.localStorage.setItem('chgRadio', '');
  //
  vuMeterShow(streamType);
  //
  favListShow("play", radioIcon, radioName, streamType, StreamUrl);
  displayMessages(radioName);
  //
  $('#radioOn').show();
  $('#radioOff').hide();
  $('#equalizerOn').show();
  $('#equalizerOff').hide();
  $('#favSignal').fadeIn();
  $('#vu-meter').fadeIn();
  //

};

//
//
function displayMessages(radio){
    $('#displayMessages').html(
      ''+radio+'<br>'+
      // '<font id="" style="color:red;">Por favor, fique on-line novamente para poder sintonizar as r&acute;adios!</font>'+
      ''
    );
}
//
//
//
function vuMeterShow(value){
      //
      $('#vu-meter_m3e8').hide();
      $('#vu-meter_general').hide();
      $('#vu-meter_generalB').hide();
      //
      // if(value){
        actualMediaType = value;
      // }
      // else if(!value){
      //   value = actualMediaType;
      // // };
      // console.log(" isStrata=", isStrata)
      // console.log(" actualMediaType=", actualMediaType)
      //
      // se o menu estiver aberto, "isStrata=true", nao mostra o VU-meter, mesmo que clique em uma radio.
      //
      if (isStrata==true){
          if(value == 'm3u8'){
            $('#vu-meter_m3e8').show();
          }
          if(value == 'general'){
            $('#vu-meter_general').show();
          }
          if(value == 'generalB'){
            $('#vu-meter_generalB').show();
          }
      }
}
//
function vuMeterShowByMenu(value){
      //
      if(value == 'show' && actualMediaType == 'm3u8'){
        $('#vu-meter_m3e8').fadeIn();
      }
      else if(value == 'show' && actualMediaType == 'general'){
        $('#vu-meter_general').fadeIn();
      }
      else{
        $('#vu-meter_m3e8').hide();
        $('#vu-meter_general').hide();
      }
}
//
function stopRadio2(){
      //
      // m3u8
      var hls = new Hls();
      hls.loadSource('https://medias.sgr.globo.com/hls/aCBNSP/aCBNSP.m3u8');
      hls.attachMedia(video);
      video.pause();
      //
      // general
      document.getElementById('player_html5').pause();
      document.getElementById('player_html5').src = "";
      //
      // generalB
      document.getElementById('player_html5B').pause();
      document.getElementById('player_html5B').src = "";
      //
      $('#radioOn').hide();
      $('#radioOff').show();
      $('#equalizerOn').hide();
      $('#equalizerOff').show();
      $('#favSignal').fadeOut();
      $('#vu-meter').fadeOut();
      //
      $('#favRadioLogo').html('<img  class="ImgLogos" src="assets/images/tools/empty.png"  style="" >');
      //
      favListShow("stop");
}
//
function openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
}
//
function goPrivicyPolicy(){
        $('#oneModalBodyHelp').html(goPrivicyPolicyText);
        $('#modalHelp').modal({});
}
//
// function goBilling(){
//   $('#oneModalBodyHelp').html(''+
//     '<div class="app" style="border:1px solid red;">'+
//     '<p id="gold-coins">Gold:</p>'+
//     '<div id="consumable1-purchase">Please wait...</div>'+
//     '</div>'+
//     '<br>'+
//     '<div class="app"style="border:1px solid yellow;">'+
//     '<p id="locked">FEATURE LOCKED</p>'+
//     '<div id="nonconsumable1-purchase">Please wait...</div>'+
//     '</div>'+
//     ''
//   );
//   $('#modalHelp').modal({});
// // }
// }
  function goHelp(){
        $('#oneModalBodyHelp').html(goHelpText);
        // $('#oneModalBodyHelp').html('<iframe src="http://kakadelivery.atwebpages.com/radio80fm.apoio"    width="100%" height="400px"></iframe>');
        $('#modalHelp').modal({});
  }
  function goConfig(){
        $('#oneModalBodyHelp').html(configBack);
        $('#modalHelp').modal({});
  }
  //
  function chgTheme(value){
      if(value == 'bosch'){
        $('#radioOn').html('<img src="assets/images/radios/BOSCH_RIO_DE_JANEIRO.png"       style="width:100%;">');
        $('#radioOff').html('<img  src="assets/images/radios/BOSCH_RIO_DE_JANEIRO_off.png" style="width:100%;" >');
        window.localStorage.setItem("chgTheme", value);
        storage = window.localStorage.chgTheme;
      };
      if(value == 'apple'){
        $('#radioOn').html('<img src="assets/images/radios/macos.png"       style="width:100%;">');
        $('#radioOff').html('<img  src="assets/images/radios/macos_off.png" style="width:100%;" >');
        window.localStorage.setItem("chgTheme", value);
        storage = window.localStorage.chgTheme;
      };
      if(value == 'win'){
        $('#radioOn').html('<img src="assets/images/radios/winplayer.png"       style="width:100%;">');
        $('#radioOff').html('<img  src="assets/images/radios/winplayer_off.png" style="width:100%;" >');
        window.localStorage.setItem("chgTheme", value);
        storage = window.localStorage.chgTheme;
      };
        }
  //
  
goPrivicyPolicyText ='<br> <font  color=#2F4F4F  >Se tiver d&uacute;vidas, por favor nos escreva um e-mail. <br><br><a mailto="roberval.sena@gmail.com">roberval.sena@gmail.com</a><br><br><br><br><h2>Pol&iacute;tica de privacidade para <a href="http://namae.space">Vintage Radio</a></h2><p>Todas as suas informa&ccedil;&otilde;es pessoais recolhidas, ser&atilde;o usadas para o ajudar a tornar a sua visita no nosso site o mais produtiva e agrad&aacute;vel poss&iacute;vel.</p><p>A garantia da confidencialidade dos dados pessoais dos utilizadores do nosso site &eacute; importante para o Vintage Radio.</p><p>Todas as informa&ccedil;&otilde;es pessoais relativas a membros, assinantes, clientes ou visitantes que usem o Vintage Radio   ser&atilde;o tratadas em concord&acirc;ncia com a Lei da Prote&ccedil;&atilde;o de Dados Pessoais de 26 de outubro de 1998 (Lei nu. 67/98).</p>  <p>A informa&ccedil;&atilde;o pessoal recolhida pode incluir o seu nome, e-mail, n&uacute;mero de telefone e/ou celular, morada,   data de nascimento e/ou outros.</p><p>O uso do DEac pressup&otilde;e a aceita&ccedil;&atilde;o deste Acordo de privacidade. A equipe   do DEac reserva-se ao direito de alterar este acordo sem aviso pr&eacute;vio. Deste modo, recomendamos que consulte a   nossa pol&iacute;tica de privacidade com regularidade de forma a estar sempre atualizado.</p><h2>Os an&uacute;ncios</h2>  <p>Tal como outros websites, coletamos e utilizamos informa&ccedil;&atilde;o contida nos an&uacute;ncios. A informa&ccedil;&atilde;o contida   nos an&uacute;ncios, inclui o seu endere&ccedil;o IP (Internet Protocol), o seu ISP (Internet Service Provider, como o   Sapo, Clix, ou outro), o browser que utilizou ao visitar o nosso website (como o Internet Explorer ou o   Firefox), o tempo da sua visita e que p&aacute;ginas visitou dentro do nosso website.</p><h2>Cookie DoubleClick  Dart</h2><p>O Google, como fornecedor de terceiros, utiliza cookies para exibir an&uacute;ncios no nosso   website;</p><p>Com o cookie DART, o Google pode exibir an&uacute;ncios com base nas visitas que o leitor  fez a outros websites na Internet;</p><p>Os utilizadores podem desativar o cookie DART visitando   a Pol&iacute;tica de <a href="http://politicaprivacidade.com/" title="privacidade da rede de conte&uacute;do">  privacidade da rede de conte&uacute;do</a> e dos an&uacute;ncios do Google.</p>  <h2>Os Cookies e Web Beacons</h2><p>Utilizamos cookies para armazenar informa&ccedil;&atilde;o,   tais como as suas prefer&ecirc;ncias pessoas quando visita o nosso website. Isto poder&aacute; incluir   um simples popup, ou uma liga&ccedil;&atilde;o em v&aacute;rios servi&ccedil;os que providenciamos, tais como f&oacute;runs.</p>  <p>Em adi&ccedil;&atilde;o tamb&eacute;m utilizamos publicidade de terceiros no nosso website para suportar os custos de manuten&ccedil;&atilde;o.     Alguns destes publicit&aacute;rios, poder&atilde;o utilizar tecnologias como os cookies e/ou web beacons quando publicitam no     nosso website, o que far&aacute; com que esses publicit&aacute;rios (como o Google atrav&eacute;s do Google AdSense) tamb&eacute;m recebam a     sua informa&ccedil;&atilde;o pessoal, como o endere&ccedil;o IP, o seu ISP, o seu browser, etc. Esta fun&ccedil;&atilde;o &eacute; geralmente utilizada para geotargeting     (mostrar publicidade de Lisboa apenas aos leitores oriundos de Lisboa por ex.) ou apresentar publicidade direcionada a um tipo de     utilizador (como mostrar publicidade de restaurante a um utilizador que visita sites de culin&aacute;ria regularmente, por ex.).</p>    <p>Voc&ecirc; det&eacute;m o poder de desligar os seus cookies, nas op&ccedil;&otilde;es do seu browser, ou efetuando altera&ccedil;&otilde;es nas ferramentas de programas       Anti-Virus, como o Norton Internet Security. No entanto, isso poder&aacute; alterar a forma como interage com o nosso website, ou outros       websites. Isso poder&aacute; afetar ou n&atilde;o permitir que fa&ccedil;a logins em programas, sites ou f&oacute;runs da nossa e de outras redes.    </p><h2>Liga&ccedil;&otilde;es a Sites de terceiros</h2><p>O Vintage Radio possui liga&ccedil;&otilde;es para outros sites, os quais, a nosso ver, podem conter informa&ccedil;&otilde;es       / ferramentas &uacute;teis para os nossos visitantes. A nossa pol&iacute;tica de privacidade n&atilde;o &eacute; aplicada a sites de terceiros, pelo que, caso       visite outro site a partir do nosso dever&aacute; ler a pol&iacute;tica de privacidade do mesmo.</p><p>N&atilde;o nos responsabilizamos pela pol&iacute;tica de         privacidade ou conte&uacute;do presente nesses mesmos sites.</p></font><br><br>'+
''
;
goHelpText =
    'Contribua com o projeto comprando a vers&atilde;o paga e tenha mais r&aacute;dios disponiveis!<br><br>'+
    'Assim voce ajuda o projeto e vai ter um apk mais completo! <br>'+
    ''
;
  configBack =
      '<div class="container" style="width:100%; height:;">'+
      '  <div class="dropdown">'+
      '    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Fundo'+
      '    <span class="caret"></span></button>'+
      '    <ul class="dropdown-menu">'+
      '      <li><a onclick="chgBakcGround(`black`);"   >preto</a></li>'+
      '      <li><a onclick="chgBakcGround(`white`);"   >branco</a></li>'+
      '      <li><a onclick="chgBakcGround(`ice`);"     >ice</a></li>'+
      '      <li><a onclick="chgBakcGround(`mac`);"     >mac</a></li>'+
      '      <li><a onclick="chgBakcGround(`mac_blue`);">mac_blue</a></li>'+
      '      <li><a onclick="chgBakcGround(`metal`);"   >metal</a></li>'+
      '    </ul>'+
      '  </div>'+
      '</div>'+
      '</br>'+
      '<div class="container" style="width:100%; height:;">'+
      '  <div class="dropdown">'+
      '    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Tema'+
      '    <span class="caret"></span></button>'+
      '    <ul class="dropdown-menu">'+
      '      <li><a onclick="chgTheme(`bosch`);">Bosch</a></li>'+
      '      <li><a onclick="chgTheme(`apple`);">Apple</a></li>'+
      '      <li><a onclick="chgTheme(`win`);">Windows</a></li>'+
      '    </ul>'+
      '  </div>'+
      '</div>'+
      '</br>'+
      'Contribua com o projeto comprando a versao paga e tenha mais opcoes disponiveis!'+
      ''
  ;
//
function firstTimeUse(option){
  //
  optionTemp=option+1
  //
  if ( option==1 || option==2 || option==3 || option==4 || option==5 ){
    $('#firstTimeUsing'+option).fadeOut();
    setTimeout(function(){
        $('#firstTimeUsing'+optionTemp).fadeIn();
    },600);
    if ( option==5 ){
      $('.iosContainerBackground').fadeOut();
      window.localStorage.setItem("firstTimeUsing", "false");
    };
  };
  //
  if ( option==11 || option==22 || option==33 || option==44 || option==55 ){
    alert("You must alow it, in order to use this APP.");
  }
  console.log(window.localStorage.firstTimeUsing);
};
//
function screenResolution() {
    var bw = window.innerWidth;
    var bh = window.innerHeight;
    var sw = screen.width;
    var sh = screen.height;
    // $('#gameScreen').width(bw)
    // $('#gameScreen').height(bh)
    console.log(" screenResolution: ");
}
//
function showAll(){
  //
  $('#body-container').fadeIn(2000);
  //
  // vu-meter
  //  https://rpy.xyz/posts/20190119/web-audio-meters.html                ->    mais coisas
  var myMeterElement = document.getElementById('my-peak-meter');
  var myAudio = document.getElementById('player');
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var sourceNode = audioCtx.createMediaElementSource(myAudio);
  sourceNode.connect(audioCtx.destination);
  var meterNode = webAudioPeakMeter.createMeterNode(sourceNode, audioCtx);
  webAudioPeakMeter.createMeter(myMeterElement, meterNode, {});
  myAudio.addEventListener('play', function() {
    audioCtx.resume();
  });
  //
  // vu-meter 2
  //
  var myMeterElement2 = document.getElementById('my-peak-meter2');
  var myAudio2 = document.getElementById('player_html5');
  var audioCtx2 = new (window.AudioContext || window.webkitAudioContext)();
  var sourceNode2 = audioCtx2.createMediaElementSource(myAudio2);
  sourceNode2.connect(audioCtx2.destination);
  var meterNode2 = webAudioPeakMeter2.createMeterNode(sourceNode2, audioCtx2);
  webAudioPeakMeter2.createMeter(myMeterElement2, meterNode2, {});
  myAudio2.addEventListener('play', function() {
    audioCtx2.resume();
  });
};
//
//
//
// favRadioList = "";
// window.localStorage.setItem('favRadioList', '{"atributo1": "antena1", "atributo2": 23, "atributo3": 24}');
// window.localStorage.setItem('favRadioList', '');
// window.localStorage.setItem('favRadioList', '{"1": "antena1"}');
favRadioList = window.localStorage.favRadioList;
if (favRadioList) {
    // console.log("----------------------");
    favRadioList = JSON.parse(favRadioList);
}
else if (!favRadioList) {
    window.localStorage.setItem('favRadioList', '{"1": ["assets/images/logos/radio80fm.png", "Radio 80FM", "general", "http://104.247.221.130:9020/;", "", ""]}');
    window.localStorage.setItem('chgRadio',     '{"1": ["assets/images/logos/radio80fm.png", "Radio 80FM", "general", "http://104.247.221.130:9020/;"]}');
}
// console.log("    INICIO   => ", favRadioList);
//
//
//
function favListShow(status, radioIcon, radioName, streamType, StreamUrl){
    //
    favContainer ();
    //
    favRadioList = window.localStorage.favRadioList;
    if (favRadioList) {
      favRadioList = JSON.parse(favRadioList);
    }
    // console.log("favListShow", status, radioIcon);
    //
    if (!status) {
      status="stop";
    }
    if (!radioIcon) {
      radioIcon="none";
    }
    //
    //
    //
    if(status=="stop"){
        $('#favSignal').html('<img  class="" src="assets/images/tools/fav_off.png"  style="width:48px;" onclick="favListSetUp(`stop`, `none`)"> ');
    }
    if (status=="play"){
        $('#favSignal').html('<img  class="" src="assets/images/tools/fav_off.png"  style="width:48px;" onclick="favListSetUpAdd(`play`, `'+radioIcon+'`, `'+radioName+'`, `'+streamType+'`, `'+StreamUrl+'`)"> ');
        for (var key of Object.keys(favRadioList)) {
          if (favRadioList[key][0]==radioIcon) {
              $('#favSignal').html('<img  class="imgToTheCenter" src="assets/images/tools/fav_on.png"   style="width:48px" onclick="favListSetUpRemove(`play`, `'+favRadioList[key][0]+'`, `'+favRadioList[key][1]+'`, `'+favRadioList[key][2]+'`, `'+favRadioList[key][3]+'`)"> ');
          }
        }
    }
}
//
function favListSetUpAdd(status, radioIcon, radioName, streamType, StreamUrl){
    //
    console.log('radioIcon',radioIcon)
    console.log('radioName',radioName)
    console.log('streamType',streamType)
    console.log('StreamUrl',StreamUrl)
    //
    favRadioListTemp = "";
    favRadioList = window.localStorage.favRadioList;
    count=0;
    if (!favRadioList) {
        count++
        favRadioListTemp = '{"'+count+'": ["'+radioIcon+'", "'+radioName+'", "'+streamType+'", "'+StreamUrl+'"]}'
    }
    else if (favRadioList) {
        favRadioList = JSON.parse(favRadioList);
        for (var key of Object.keys(favRadioList)) {
            if(favRadioList[key][0] == 'test'){

            }
            else{
              // console.log('   favRadioList[key][0]: ',favRadioList[key][0])
              count++
              favRadioListTemp = favRadioListTemp + '"'+count+'": ["'+favRadioList[key][0]+'", "'+favRadioList[key][1]+'", "'+favRadioList[key][2]+'", "'+favRadioList[key][3]+'"],';
            }
        }
        count++
        favRadioListTemp = favRadioListTemp + '"'+count+'": ["'+radioIcon+'", "'+radioName+'", "'+streamType+'", "'+StreamUrl+'"]';
        favRadioListTemp = "{"+favRadioListTemp +"}";
    }
    console.log(favRadioListTemp)
    //
    window.localStorage.setItem('favRadioList', favRadioListTemp);
    //
    // favRadioList = window.localStorage.favRadioList;
    // favRadioList = JSON.parse(favRadioList);
    favListShow(status, radioIcon, radioName, streamType, StreamUrl)
    //
}
//
async function tuneInFind () {
  //
  console.log('  ====> mole: ')
  $("#findResults").html('');
  $('#findResults').append(''+
      '<div id="tempSpinner2">'+
      '  <img src="assets/images/system/spinner2.gif" width="48px">'+
      '  Procurando r&aacute;dios em servers da WEB...'+
      '</div>'
  );
  //
  // let search = 'transamerica'
  // let search = 'jovempan'
  // let search = 'Rádio CBN São Paulo'
  // let search = 'BandNews FM São Paulo'
  // let search = 'kissfm'
  // let search = 'antena1'
  // let search = 'cidade'
  // let search = 'Alpha FM São Paulo'
  // let search = '89 fm a radio rock'
  // let search = 'Rádio 80 FM'
  // let search = 'Kiss FM São Paulo'      // bloqueada....
  // let search = 'KissFM Rio de Janeiro'  // nao acha
  search = document.getElementById('findContainerInput').value;
  //
  let url = `https://api.tunein.com/profiles?fullTextSearch=true&query=${search}&formats=mp3,aac,ogg,flash,html,hls&serial=369bf28b-5bc3-4ee1-bb43-14c29616cfd5&partnerId=RadioTime&version=4.3507&itemUrlScheme=secure&reqAttempt=1`
  // acha algo! Quando achar  faca isso (then) se nao faca aquilo (catch) e depois faca isto (finally)
  // promisse
  try {
    let res = await axios.get(url)
    // console.log("    url= ", url);
    // console.log("    res= ", res);
    //data.Items[1].Children[0].Description
    // 
    let group = res.data.Items.find(e => e.Title === "Rádios").Children
    // console.log('   group; ', group)
    //
    for (var key of Object.keys(group)) {
                //
                let Image = group[key].Image
                //
                //https://pt.stackoverflow.com/questions/104843/pegar-o-nome-da-imagem-na-url
                var url2 = Image;
                var partes = url2.split(/[\/\\]/);
                var img = partes.pop();
                var imageFinal = img.split('?');
                //
                let GuideId = group[key].Actions.Follow.GuideId
                let title = group[key].Properties.SEOInfo.Title
                let subtitle = group[key].Subtitle
                let Description = group[key].Description
                let AccessibilityTitle = group[key].AccessibilityTitle
                url = `https://opml.radiotime.com/Tune.ashx?id=${GuideId}&render=json&formats=mp3,aac,ogg,flash,html,hls&partnerId=RadioTime`
                res = await axios.get(url)
                // console.log('    ======> res: ', res)
                // console.log('    ')
                let id = res.data.body[0].guide_id.replace('e', '')
                url = `https://stream.core-prod.us-west-2.tunenet.io/listen.stream?streamId=${id}&render=json`
                res = await axios.get(url)
                // console.log('    ======> res: ', res)
                // console.log('    ')
                let playerUrl = res.data.Streams[0].Url
                var playerUrlM3u8 = playerUrl.match(/m3u8/g);
                var playerUrlfabricahost = playerUrl.match(/fabricahost/g);
                // console.log('playerUrlM3u8')

                
                //
                
                
                
                $('#findResults')       .append(' <div id="findResultsDiv'+key+'" style="border:1px solid gray; width:100%; padding:5px; margin: 5px 5px 25px 5px;; border-radius:20px; background-color: #a6a6a6;"> ');
                $('#findResultsDiv'+key).append(' <img src="'+Image+'"<br>');

                if(playerUrlM3u8){
                  $('#findResultsDiv'+key).append('<button class="btn btn-sml" style="margin:10px; padding:10px;" onclick="startRadio(`'+Image+'`, `'+title+'`, `m3u8`,`'+playerUrl+'` ,`.9`,`onLine`, `'+subtitle+'`, `estado`, `cidade` )">  tocar  </button> '); 
                  // onclick="startRadio(`alphafmsp`,      `Alpha FM S&atilde;o Paulo`,  `generalB`,`https://ice.fabricahost.com.br/alphafm1017`                  ,`.0`, `Alpha FM São Paulo`, `estado`, `cidade` )
                  
                }
                else if(playerUrlfabricahost){
                  $('#findResultsDiv'+key).append('<button class="btn btn-sml" style="margin:10px; padding:10px;" onclick="startRadio(`'+Image+'`, `'+title+'`, `generalB`,`'+playerUrl+'` ,`.9`,`onLine`, `'+subtitle+'`, `estado`, `cidade` )">  tocar </button> '); 
                    //'<button class="btn btn-sml" onclick="startRadio(`'+Image+'`, `'+title+'`, `m3u8`,`'+playerUrl+'` ,`.9`, `'+subtitle+'`, `estado`, `cidade` )>  tocar </button> '); 
                  // onclick="startRadio(`alphafmsp`,      `Alpha FM S&atilde;o Paulo`,  `generalB`,`https://ice.fabricahost.com.br/alphafm1017`                  ,`.0`, `Alpha FM São Paulo`, `estado`, `cidade` )
                  
                }
                else {
                  $('#findResultsDiv'+key).append('<button class="btn btn-sml" style="margin:10px; padding:10px;" onclick="startRadio(`'+Image+'`, `'+title+'`, `general`,`'+playerUrl+'` ,`.9`,`onLine`, `'+subtitle+'`, `estado`, `cidade` )">  tocar </button> '); 

                }
                //
                $('#findResultsDiv'+key)       .append("<br><br><br>");
                // $('#findResultsDiv'+key).append(" <br>    <b>Image </b> ", Image+'<br>');
                // $('#findResultsDiv'+key).append(" <b>ImageFinal </b> ", imageFinal[0]+'<br>');
                // $('#findResultsDiv'+key).append(" <br>    <b>GuideId </b> ", GuideId+'<br>');
                $('#findResultsDiv'+key).append("    <b>R&aacute;dio </b> ", title+'<br>');
                $('#findResultsDiv'+key).append("    <b>Sub-t&iacute;tulo </b> ", subtitle+'<br>');
                $('#findResultsDiv'+key).append("    <b>Descri&ccedil;&atilde;o </b> ", Description+'<br>');
                // $('#findResultsDiv'+key).append("    <b>AccessibilityTitle </b> ", AccessibilityTitle+'<br>');
                // $('#findResultsDiv'+key).append("    <b>playerUrl  </b>", playerUrl+'<br>');
                // $('#findResultsDiv'+key).append("    <b>playerUrlM3u8  </b>", playerUrlM3u8+'<br>');
                // $('#findResultsDiv'+key).append("    <b>playerUrlfabricahost  </b>", playerUrlfabricahost+'<br>');
                $('#findResults')       .append(' </div>');
                // $("#findResults")       .append(" <br><br><br>");


                var playerUrlM3u8 = playerUrl.match(/m3u8/g);
                var playerUrlfabricahost = playerUrl.match(/fabricahost/g);
                if      (playerUrlM3u8       ){playerType="m3u8"}
                else if (playerUrlfabricahost){playerType="generalB"}
                else                          {playerType="general"}
                
                // $('#findResultsDiv'+key).append('<br>');
                // $('#findResultsDiv'+key).append('&lt;img src="'+Image+'" onclick="startRadio(`'+Image+'`, `'+title+'`, `'+playerType+'`,`'+playerUrl+'` ,`.9`,`onLine`, `'+subtitle+'`, `estado`, `cidade` )" class="ImgLogos"&gt;');
                // console.log(' ');
                // console.log(' ');



    }

  } catch (error) {
    console.error(error)
  }
  //
  $("#findResults").append('    <br><br><br> Isso &eacute; tudo o que achamos!');
  $('#tempSpinner2').hide()
  // console.log('termino')
}
//
function favListSetUpRemove(status, radioIcon, radioName, streamType, StreamUrl){
        //
        favRadioListTemp = "";
        favRadioList2 = window.localStorage.favRadioList;
        favRadioList3 = JSON.parse(favRadioList2);
        //
        test = Object.entries(favRadioList).length;
        if (test == 1) {
            window.localStorage.setItem('favRadioList', '');
        }
        else{
            for (var key of Object.keys(favRadioList3)) {
                  if(radioIcon==favRadioList3[key][0]){

                  }
                  else{
                    favRadioListTemp = favRadioListTemp + '"'+key+'": ["'+favRadioList3[key][0]+'", "'+favRadioList3[key][1]+'", "'+favRadioList3[key][2]+'", "'+favRadioList3[key][3]+'"],';
                  }
            }
            favRadioListTemp = '{'+favRadioListTemp + '"500": ["test"]}';
            window.localStorage.setItem('favRadioList', favRadioListTemp);
        }
        favListShow(status, radioIcon, radioName, streamType, StreamUrl)
}
//
function favContainer (){
  // console.log("favContainer");
  $('#favContainer').html('');
  favRadioList = window.localStorage.favRadioList;
  if (favRadioList) {
        favRadioList = JSON.parse(favRadioList);
        for (var key of Object.keys(favRadioList)) {
          if (favRadioList[key][0] == "test") {
          }
          else {
            $('#favContainer').append('<img src='+favRadioList[key][0]+' class="ImgLogos" onclick="startRadio(`'+favRadioList[key][0]+'`, `'+favRadioList[key][1]+'`, `'+favRadioList[key][2]+'`, `'+favRadioList[key][3]+'`)" style="padding:2px; margin:1px;">');
          }
        }
  }
}
//
// products = ["tema100", "tema500", "tema1500", "signature100"];
// //
// // $("#findResults").append("_____products1: " +  products);
// for (var i = 0; i < products.length; i++) {
//     if (window.store) {
//         store.register({
//             id:    products[i],
//             alias: 'alias '+i,
//             type:   store.NON_CONSUMABLE
//         });
//         //
//         console.log("_____id: ", products[i] )
//         console.log("_____alias2: ", 'alias '+i  )
//         console.log("______type: ", store.NON_CONSUMABLE  )
//       }
// }

// When everything goes as expected, it's time to celebrate!
// if (window.store) store.ready(function() {
//     console.log("\\o/ STORE READY \\o/");
// });

// After we've done our setup, we tell the store to do
// it's first refresh. Nothing will happen if we do not call store.refresh()
// if (window.store) store.refresh();
//
// preparado para mensagem de ter carregado a radio!
//
// audio  = document.getElementById('player_html5');
// audio2 = document.getElementById('player');
// // 
// audio.addEventListener('canplaythrough', function() { 
//   console.log('  amoreira; START')
//   $('#displaySpinner').hide();
// }, false);

//
//
$(document).ready(function(){
  // colouquei isso em 3 lugares pra garantir que iria bloquear o VU fake...  que insiste em ficar aparecendo do nada...
  $('#vu-meter_generalB').hide();

    // screenResolution();
    //
    // firstTimeUsing = window.localStorage.firstTimeUsing;
    // if( !firstTimeUsing ){
    //     $('.iosContainerBackground').fadeIn();
    // };
    //
    storage = window.localStorage.chgBakcGround;
    if (!storage){
        storage =  'mac_blue';
    }
    // chgBakcGround(storage);
    //
    storage2 = window.localStorage.chgTheme;
    if (!storage2){
        storage2 =  'apple';
    }
    chgTheme(storage2);
    //
    storage3 = window.localStorage.chgRadio;
    if (!storage3){
        storage3 =  'antena1';
    }
    //
    // console.log(" ready: ");
    //
    if (!' storage : ', storage ){
        window.localStorage.setItem("serverActual", "final");
    }
    //
    //
    //
    setTimeout(function(){ 
      

      document.getElementById("defaultOpen").click();
      //
      showAll();
      //
      favContainer ();
      //
      $('#vu-meter').hide();
      //
      // player para m3d8
      video = document.querySelector('#player');
      
      // loading the miniLogo from the theme!
      $('#menuButtomMiniLogo').html('<img src="assets/themes/'+theme+'/images/miniLogo.png"  width="55" height="55" >')
      // loading the button menu from the theme!
      $('#sideMenu01')        .html('<img src="assets/themes/'+theme+'/images/menu.png"  width="55" height="55" >')
  

     }, 500);



});
