"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Invoice
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# /token POST
# this route is for when the user ALREADY exists and needs an access token 
# create a user query with a conditional to see if the user exists, or retuirn None

@api.route('/token', methods=['POST'])
def generate_token():

    # recieving the request and converting the body of the request into json format
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # query the user table to check if the user exists
    email = email.lower()
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        response = {
            "msg": "Email or Password does not match."
        }
        return jsonify(response), 401
    
    access_token = create_access_token(identity=user.id)
    response = {
        "access_token": access_token,
        "user_id": user.id,
        "msg": f'Welcome {user.email}! This worked!'
    }
    return jsonify(response), 200


# create a route for sign up that will add the user's email and password to the DB
# POST
# test that on postman
@api.route("/signup", methods=['POST'])
def register_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    # query to check if the email already exists
    email = email.lower()
    user = User.query.filter_by(email=email).first()

    if user is not None and user.email == email:
        response = {
             "msg": "User already exists."
        }
        return jsonify(response), 403
    
    # if the email does NOT exist, go ahead anfd make a new record i. the DB
    # sign the person up
    user = User()
    user.email = email
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()

    response = {
        "mesg": f"Congratulations {user.id}. You have successfully sign up!"
    }
    return jsonify(response), 200


# create a route for /invoices that will retrieve and return the users invoices
@api.route("/invoices", methods=['GET'])
@jwt_required()
def get_invoices():

    # retreive the user_id of the current user from the access_token
    # you do tha with get_jwt_identity
    user_id = get_jwt_identity()
    # return jsonify(logged_in_as=user_id), 200

    user = User.query.filter_by(id = user_id).first()
    # query and retrieve any invoices that are i the DB
    user_invoices = Invoice.query.filter_by(user_id=user_id).all()

    # use a list comprehension (for loop) that will:
    # 1. Get each invoice object and serialize() it
    # 2. Put them in the processed_invoices array
    processed_invoices = [each_invoice.serialize() for each_invoice in user_invoices]

    response = {
        "msg": f"Hello {user.email}, here are your invoices.",
        "invoices": processed_invoices
    }
    return jsonify(response), 200
    
# in json format
# GET

#  work on the front end
#  1. create 3 new pages: /Signup, /Login, /Private
#  2. create the neccessary inputs needed for signup.js and login.js
#  3. make sure that they are controlled inputs (useState)
#  4. include useContext and Context for flux applications
#  5. update flux.js to have token, message, invoices in the store
#  6. update and test actions to be able to retrieve a token and save  

