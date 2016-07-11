var w3w;
var options = {
    key: apikey
};

w3w = new W3W.Geocoder(options);

var callback = {
    onSuccess: function(data) {
        console.log(JSON.stringify(data));
    },
    onFailure: function(data) {
        console.log(JSON.stringify(data));
    }
};

var params = {
    addr: 'index.home.raft'
};

w3w.forward(params, callback);
