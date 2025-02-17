var timer;

$('#time').change(function() {
  // console.log($('#time').val());
  if(timer){
    clearInterval(timer);
    setTimer($('#time').val());
  }
  // console.log(" WARNNING : ", "TIME");
});
function setTimer(time){
  // console.log(time);
  if(!time || time < 1000){
    time = 1000;
  }
    time = 10000;  // time beetwin pings
  // console.log(time);
  timer = setInterval(test, time);
  // console.log(" WARNNING : ", "SETTIMER", time);
}
google.load('visualization', '1.1', {
  packages: ['line']
});


google.setOnLoadCallback(init);
var chart;
var data;
var options = {
  chart: {
    title: 'Ping test',
    animation: {
      duration: 3000,
      easing: 'out'
    }
  },
  width: 200,
  height: 150
};

// console.log(" WARNNING : ", "");
function init(){
  data = new google.visualization.DataTable();
  data.addColumn('number', '');
  data.addColumn('number', 'ms');
  data.addRows([[1, 1]]);
}
function updateChart(dataset){
  data.addRow(dataset);
  drawChart();
  // console.log(" WARNNING : ", "UPDATE CHART");
}
var request_image = function(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() { resolve(img); };
        img.onerror = function() { reject(url); };
        img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
        // console.log(" WARNNING : ", "REQUEST IMAGE");
    });
};
var ping = function(url, multiplier) {
    return new Promise(function(resolve, reject) {
        var start = (new Date()).getTime();
        var response = function() {
            var delta = (((new Date()).getTime() - start));
            delta *= (multiplier || 1);
            resolve(delta);

            deltaShow = delta/10 ;
            // deltaShow = deltaShow*-1;
            // deltaShow = deltaShow+100;

            // console.log(" WARNNING : ", "delta   ping ", delta, ' ', deltaShow);
            // $('#progressTitlePing').html(
            //   delta+' - '+deltaShow
            // );
            color = 'progress-bar-info';
            if     (deltaShow < 33                   ){ color = 'progress-bar-success' }
            else if(deltaShow > 34 && deltaShow < 55 ){ color = 'progress-bar-info'}
            else if(deltaShow > 56 && deltaShow < 74 ){ color = 'progress-bar-warning'}
            else if(deltaShow > 75                   ){ color = 'progress-bar-danger'};

            // console.log("  PING: ")

            //
            // checa se o navegador esta on-line
            //
            onLine = navigator.onLine;
            // console.log("       onLine", onLine);
            if(onLine == true){
              
            $('#progressBar').html(
                '<div class="progress-bar '+color+' pppprogress-bar-striped" role="progressbar" aria-valuenow="10" aria-valuemin="10" aria-valuemax="1000" style="width:'+deltaShow+'%">'+
                '     <font  id="" style="color:black;">  </font>'+
                '</div>'+
                ''
                );
                //
                // $('#displayMessages').html(
                //   ''
                // );
            }
            if(onLine == false){
                $('#progressBar').html(
                  '<font id="" style="color:red;font-size:10px;">OFF-LINE!!</font>'+
                  ''
                );
                //
                $('#displayMessages').html(
                  '<font id="" style="color:red;font-size:10px;">OFF-LINE!!</font><br>'+
                  '<font id="" style="color:red;">Por favor, fique on-line novamente para poder sintonizar as r&acute;adios!</font>'+
                  ''
                );
            }


        };
        request_image(url).then(response).catch(response);

        //
        // Set a timeout for max-pings, 5s.
        //
        // setTimeout(function() {
        //     reject(Error('Timeout'));
        //     delta = 10000;
        //     console.log(" WARNNING : ", "PING timeOut ", delta);
        // }, 1000);
        // console.log(" WARNNING : ", "PING");
    });
};

function test(){
  // var address = "http://192.168.1.10/icons/ubuntu-logo.png";
  var address = "http://tunein.com/favicon.ico";
  ping(address).then(function(result) {
    updateChart([data.getNumberOfRows()+1,result]);
  }).catch(function(error) {
    // updateChart([data.getNumberOfRows()+1,5000]);
    // console.log(" WARNNING : ", "TEST");
  });
}


test();
setTimer($('#time').val());
// console.log(" WARNNING : ", "START");
