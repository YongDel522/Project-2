const incident_url='https://municipal.systems/v1/places/ga/dataTypes/traffic-incident/data?key=3a58239a-1f90-4ecc-8a04-dbe14072128c';
const jam_url = "https://municipal.systems/v1/places/ga/dataTypes/traffic-jam/data?key=dba4aa07-6314-42fd-927c-2f52106600fc"
async function getData(incident_url,jam_url){
  const response=await fetch(incident_url);
  const data = await response.json();
    // console.log(data);
    incident_variables = vars(data);
    console.log(incident_variables);
}

function vars(data){
  data = data['results']
  accidentType = [];
  coordinates = [];
  weather = [];
  dateTime = [];

  for (item in data){
    accidentType.push(data[item]['data']['type']);
    coordinates.push(data[item]['geometry']['coordinates']);
    weather.push(data[item]['data']['weather']);
    dateTime.push(data[item]['data']['startedAt']);
  };
  variables = [accidentType,coordinates,weather,dateTime];
  return variables;
}

function makeMap(){
  const mymap = L.map('mapid').setView([33.753746, -84.386330], 13);
  const attribution ='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors';
  const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl,{ attribution });
  tiles.addTo(mymap);
}

function renderData(accidentWeather) {
  $.getJSON("/accidentWeather/" + accidentWeather, function(obj) {
      var markers = obj.data.map(function(arr) {
          return L.marker([arr[0], arr[1]]);
      });
      mymap.removeLayer(layer);
      layer = L.layerGroup(markers);
      mymap.addLayer(layer);
  });
}

$(function() {
  makeMap();
  renderData('0');
  $('#accidentsel').change(function() {
      var val = $('#accidentsel option:selected').val();
      renderData(val);
  });
})

getData();

