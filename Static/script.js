const incident_url='https://municipal.systems/v1/places/ga/dataTypes/traffic-incident/data?key=3a58239a-1f90-4ecc-8a04-dbe14072128c';
const jam_url = "https://municipal.systems/v1/places/ga/dataTypes/traffic-jam/data?key=dba4aa07-6314-42fd-927c-2f52106600fc";
async function getData(incident_url,jam_url){
  const response=await fetch(incident_url);
  const jam_response = await fetch(jam_url);
  const jam_data = await jam_response.json();
  const data = await response.json();
    // console.log(data);
  jam_variables = vars(jam_data, id='jam');
  incident_variables = vars(data, id='incident');
    // console.log(incident_variables);
  // console.log(jam_data);
};

function vars(data, id){
  data = data['results']
  accidentType = [];
  coordinates = [];
  weather = [];
  dateTime = [];
  if (id == 'incident'){
    for (item in data){
      accidentType.push(data[item]['data']['type']);
      coordinates.push(data[item]['geometry']['coordinates']);
      weather.push(data[item]['data']['weather']);
      dateTime.push(data[item]['data']['startedAt']);
    };
    variables = [accidentType,coordinates,weather,dateTime];
  };
  if (id == 'jam'){
    for(item in data){
      severity.push(data[item]['data']['severity']);
      coordinates.push(data[item]['geometry']['coordinates'][0]);
      speed.push(data[item]['data']['speed']);
      dateTime.push(data[item]['data']['endedAt']);
    };
    variables = [severity,coordinates,speed,dateTime];
  };
  return variables;
};

function makeMap(){
  const mymap = L.map('mapid').setView([33.753746, -84.386330], 13);
  const attribution ='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors';
  const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl,{ attribution });
  tiles.addTo(mymap);
};

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

// $(function() {
//   makeMap();
//   renderData('0');
//   $('#accidentsel').change(function() {
//       var val = $('#accidentsel option:selected').val();
//       renderData(val);
//   });
// })

getData(incident_url,jam_url);

