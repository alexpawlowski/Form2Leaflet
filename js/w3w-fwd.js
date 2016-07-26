// var w3w;
// var options = {
//     key: apikey
// };
//
// w3w = new W3W.Geocoder(options);
//
// var callback = {
//     onSuccess: function(data) {
//         console.log(JSON.stringify(data));
//     },
//     onFailure: function(data) {
//         console.log(JSON.stringify(data));
//     }
// };
//
// var params = {
//     addr: 'index.home.raft'
// };
//
// w3w.forward(params, callback);
L.Control.w3wfwd = L.Control.extend({
	options: {
		position: 'bottomleft',
		locationText:'- - -',
		promptText: 'Press Ctrl+C to copy location',
		precision: 4,
		apikey : apikey //your api key
	},

	initialize: function(options)
	{
		L.Control.prototype.initialize.call(this, options);
	},

	onAdd: function(map)
	{
		var className = 'leaflet-control-w3w',
			that = this,
			container = this._container = L.DomUtil.create('div', className);
		this.visible = false;

		L.DomUtil.addClass(container, 'hidden');
		L.DomEvent.disableClickPropagation(container);
		this._addText(container, map);

		L.DomEvent.addListener(container, 'click', function() {
			window.prompt("Copy to clipboard: Ctrl+C, Enter", L.DomUtil.get(this._locationText).dataset.words);
    	}, this);
		return container;
	},

	_addText: function(container, context)
	{
		this._locationText = L.DomUtil.create('span', 'leaflet-control-w3w-locationText' , container);
		L.DomUtil.get(this._locationText).innerHTML = '<strong>w3w:</strong> ' + this.options.locationText;
		return container;
	},

	_getLocations: function(obj,locText){
			var getJSON = function(url, successHandler, errorHandler) {
			 var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			  xhr.open('get', url, true);
			  xhr.responseType = 'json';
			  xhr.onreadystatechange = function() {
			    var status;
			    var data;
			    if (xhr.readyState == 4) {
			      status = xhr.status;
			      if (status == 200) {
			        successHandler && successHandler(xhr.response);
			      } else {
			        errorHandler && errorHandler(status);
			      }
			    }
			  };
			  xhr.send();
			};

			getJSON('https://api.what3words.com/v2/forward?key='+this.options.apikey+'&addr='+obj.words, function(data) {
				console.log(data);
			  locText.innerHTML = '<strong>w3w:</strong> ' + data.words;
			  locText.dataset.words =("data-",  data.words);

			}, function(status) {
			  console.log('Something went wrong.');
			});
	},

	setCoordinates: function(obj)
	{
		if (!this.visible) {
			L.DomUtil.removeClass(this._container, 'hidden');
		}
		if (obj.latlng) {
			this._getWords(obj.latlng,L.DomUtil.get(this._locationText));
		}
	}
});
