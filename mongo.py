import pymongo
import requests
import pandas as pandas
import json

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)



def traffic_accidents():
    
    url = "https://municipal.systems/v1/places/ga/dataTypes/traffic-incident/data?key=dba4aa07-6314-42fd-927c-2f52106600fc"

    response = requests.get(url).json()
    data = response["results"]

    traffic_data = pd.DataFrame(data)

    filtraffic_data= traffic_data['data']
    filtraffic_data

    coord = []
    inc_id = []
    weather = []
    inc_type = []

    for data in filtraffic_data:
        inc_loc = data['location']['coordinates']
        coord.append(inc_loc)
    
        id = data['id']
        inc_id.append(id)
    
        inc_weather = data['weather']
        weather.append(inc_weather)
    
        type = data['type']
        inc_type.append(type)

    filTrafData_df = pd.DataFrame({
        'id': inc_id,
        'type': inc_type,
        'location': coord,
        'weather': weather
    })

def traffic_jam():
    url = "https://municipal.systems/v1/places/ga/dataTypes/traffic-jam/data?key=dba4aa07-6314-42fd-927c-2f52106600fc"

    response = requests.get(url).json()
    data = response['results']

    trafficJam_df = pd.DataFrame(data)

    filTrafficJam_data = trafficJam_df['data']
    inc_id = [d.get('id') for d in filTrafficJam_data]
    delay = [d.get('delay') for d in filTrafficJam_data]
    speed = [d.get('speed') for d in filTrafficJam_data]

    path = [d.get('path') for d in filTrafficJam_data]
    coords = [d.get('coordinates') for d in path]

    filTrafJamData_df = pd.DataFrame({
        'id': inc_id,
        'delay': delay,
        'location': coord,
        'speed': speed
    })

db_jams = client.traffic_jam
db_accidents = client.traffic_accidents