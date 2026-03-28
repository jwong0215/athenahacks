from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    return jsonify({"result": data["x"] * 2})

app.run(port=5001)