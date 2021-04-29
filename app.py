from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/traffic_accidents")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    trafficData = mongo.db.collection.find_one()

    # Return template and data
    return render_template("index.html", trafficData=trafficData)

@app.route('/accidentWeather/<string:weather>')
def accidentWeather(weather):
    trafficData = mongo.db.inventory.find({"weather"})
    points = trafficData.query.filter_by(weather=weather).all()
    coords = [[point.latitude, point.longitude] for point in points]
    return jsonify({"data": coords})

if __name__ == "__main__":
    app.run(debug=True)
