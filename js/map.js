// // this comes from your google spreadsheet id
var sheetID = "1E3YDlmvbus6HZvTe3mHA5SxrL3ihXFZnZ_NNnnLGE20"

  var breweries = new L.LayerGroup();

  var beerMarker = L.AwesomeMarkers.icon({
    prefix: 'fa',
    icon: 'beer',
    markerColor: 'orange',
    iconColor: 'white'
  });
  document.addEventListener('DOMContentLoaded', function() {
Tabletop.init({
  key: sheetID,
  callback: function(sheet, tabletop){
  console.log(tabletop.sheets('Breweries'))
    for (var i in sheet){
      var place = sheet[i];
      //specify what you would like to place
      L.marker([place.lat, place.lon],
        {icon: beerMarker}
      )
        .addTo(breweries)
        .bindPopup(place.name)
    }
  },
  simpleSheet:true
})
})
    var mapAttrb = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        mapURL = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}';

  // map.whenReady(init());

    var grayscale = L.tileLayer(mapURL, {
                    	attribution: mapAttrb,
                    	subdomains: 'abcd',
                    	minZoom: 10,
                    	maxZoom: 20,
                    	ext: 'png'
                    });

    var map = L.map('mapid', {
      center:[35.965, -83.920],
      zoom: 15,
      layers: [grayscale, breweries]
    });

    var baseLayers = {
      "Grayscale": grayscale
    };

    var overlays = {
      "Breweries": breweries
    };

    L.control.layers(baseLayers, overlays).addTo(map);

  var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

  map.on('click', onMapClick);
