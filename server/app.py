#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import *
# Add your model imports


# Views go here!

@app.before_request
def check_if_logged_in():
    access = [
        'signup',
        'login',
        'check_session'
    ]
    if request.endpoint not in access and (not session.get('user_id')):
        return {'error': '401 unauthorized'}, 401


# signup endpoint to create new user
class Signup(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')
    
        existing_user = User.query.filter(User.username==username).first()
        if existing_user:
            return {'message': 'Usernane already taken.'}, 400
        
        user = User(username=username)
        user.password = password
        
        db.session.add(user)
        db.session.commit()

        return {'message': 'User created successfully.'}, 201

# login endpoint to create session if it's not already happending
class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')
        print(data)
        if not username or not password:
            print(data)
            return {'message': 'Username or password missing.'}, 400
        
        
        user = User.query.filter(User.username == username).first()

        if not user or not user.authenticate(password):
            return {'message': 'Invalid username or password.'}, 401
        
        session['user_id'] = user.id
        return {'message': 'Logged in successfully.'}, 200
# check session endpoint to make sure the user is still logged in
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {}, 401
        user = User.query.filter(User.id == user_id).first()
        return user.to_dict(rules=('-bookings',)), 200

# logout endpoint to clear the session of the user
class Logout(Resource):
    def get(self):

        session.clear()
        return {'message': 'Logged out successfully.'}, 200
    
# quick endpoint check to see if userbyid works
class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return {'error': 'user not found'}, 404
        return user.to_dict(), 200
# endpoint to get all users
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200


# endpoint for getting all rentals for rental page
class Rentals(Resource):
    def get(self):
        rentals = [rental.to_dict(rules=('-bookings',)) for rental in Rental.query.all()]
        return rentals, 200


api.add_resource(Rentals, '/rentals')    
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


