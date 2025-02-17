
//
// original cordova : the basics...
//
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // console.log("  device"+ device.cordova);
        // console.log('    WARB')



        // a loja ?!?!?
        // const state = {};
        // function setState(attr) {
        //     Object.assign(state, attr);
        //     render(state);
        // }
    

    
    },








    // // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement    = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement  = parentElement.querySelector('.received');
        //
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        //
        console.log('____Received Event: ' + id);

    }
};





//
// original cordova : init the apk.
//
app.initialize();
