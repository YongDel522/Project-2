const incident_url='https://municipal.systems/v1/places/ga/dataTypes/traffic-incident/data?key=3a58239a-1f90-4ecc-8a04-dbe14072128c';
const jam_url = "https://municipal.systems/v1/places/ga/dataTypes/traffic-jam/data?key=dba4aa07-6314-42fd-927c-2f52106600fc";
var API_KEY = "pk.eyJ1IjoidmF1Z2huc21pdGg5OSIsImEiOiJja25sdHl4NDkwamt5MnZwZW54MncxcGdnIn0.Wd6jchvnzbb5spUE5l9Qaw";

function createMap(accidentsAndJams) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the accidents layer
  var overlayMaps = {
    "Accidents": accidentsAndJams
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [33.753746, -84.386330],
    zoom: 10,
    layers: [lightmap, accidentsAndJams]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "results" property off of response.data
  var accidents_prop = response.results;
  // console.log(accidents_prop)
  // Initialize an array to hold markers
  var accidents = [];

  // Loop through the stations array
  for (var index = 0; index < accidents_prop.length; index++) {
    var acc1 = accidents_prop[index];
    // console.log(acc1)
    var acc = acc1.geometry.coordinates
    console.log(acc1.data)
    // For each accident, create a marker and bind a popup with the accident's name
    var marker = L.marker([acc[1], acc[0]])
      .bindPopup("<h3>" + acc1.data.cause + "<h3><h3>Fatalities: " + acc1.data.fatalities + "</h3>");

    // Add the marker to the bikeMarkers array
    accidents.push(marker);
  }

  // Create a layer group made from the markers array, pass it into the createMap function
  createMap(L.layerGroup(accidents));
}


// Perform an API call to the incident information. Call createMarkers when complete
d3.json(incident_url).then(createMarkers);
