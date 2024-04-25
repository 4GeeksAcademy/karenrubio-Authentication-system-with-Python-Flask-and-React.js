"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    # Obtener los datos del JSON de la solicitud
    email = request.json.get("email")
    password = request.json.get("password")

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 401

    # Crear un nuevo usuario
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "User created successfully"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email",None)
    print(email)
    password = request.json.get("password",None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "The user is no in the system"}),401
    print(user.password)
    print(password)
    if user.password != password:
        return jsonify({"msg": "bad password"}),401
    
    access_token = create_access_token(identity=email)
    
    return jsonify(access_token=access_token)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
    

@api.route('/private', methods=['POST', 'GET'])
@jwt_required()
def handle_private():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user),200   
