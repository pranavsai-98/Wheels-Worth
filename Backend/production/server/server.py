from flask import Flask, request, jsonify
import util
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/get_car_names', methods=['GET'])
def get_car_names():
    response = jsonify({
        'cars': util.get_car_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_car_price', methods=['POST'])
def predict_car_price():
    data = request.get_json()
    Model = str(data['Model'])
    vehicle_age = int(data['vehicle_age'])
    km_driven = int(data['km_driven'])
    fuel = data['fuel']
    transmission = data['transmission']
    owner = data['owner']
    seller_type = data['seller_type']

    response = jsonify({
        'estimated_price': util.get_selling_price(Model,vehicle_age,km_driven,fuel,transmission,owner,seller_type)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__=="__main__":
    print("starting python flask server for car price prediction")
    util.load_saved_artifacts()
    print(util.get_car_names())
    app.run()
