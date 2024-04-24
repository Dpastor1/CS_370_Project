from flask import Flask, jsonify
import json
import board
import busio
import adafruit_ads1x15.ads1015 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Initialize the I2C bus and the ADC object
i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1015(i2c)
chan = AnalogIn(ads, ADS.P0)

with open("cap_config.json") as json_data_file:
    config_data = json.load(json_data_file)

def percent_translation(raw_val):
    per_val = abs((raw_val - config_data["zero_saturation"]) / (config_data["full_saturation"] - config_data["zero_saturation"])) * 100
    return round(per_val, 3)

@app.route('/moisture', methods=['GET'])
def get_moisture():
    saturation_percentage = percent_translation(chan.value)
    return jsonify({'moisture': saturation_percentage})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Use the appropriate port and host
