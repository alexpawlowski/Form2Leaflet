// this comes from your google spreadsheet id
var sheetID = "1E3YDlmvbus6HZvTe3mHA5SxrL3ihXFZnZ_NNnnLGE20"

  var map = L.map('mapid', {
    center:[35.965, -83.920],
    zoom: 10
  });

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

  map.on('click', onMapClick);


//   window.onload = function(){ init() };
//   function init(){
//   Tabletop.init({
//     key: sheetID,
//     callback: function(sheet, tabletop){
//       for (var i in sheet){
//         var place = sheet[i];
//
//         //specify what you would like to place
//         L.marker([place.lat, place.lon])
//           .addTo(map)
//           .bindPopup(place.name)
//       }
//     },
//     simpleSheet:true
//   })
// }
