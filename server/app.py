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

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')
    
        existing_user = User.query.filter(User.username==username).first()
        if existing_user:
            return {'message': 'Usernane already taken.'}, 400
        
        user = User(username=username)
        user.password_hash = password
        
        db.session.add(user)
        db.session.commit()

        return {'message': 'User created successfully.'}, 201

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

class Logout(Resource):
    def get(self):

        session.clear()
        return {'message': 'Logged out successfully.'}, 200
    
api.add_resource(Logout, '/logout')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

