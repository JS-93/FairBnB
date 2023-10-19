#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from datetime import datetime
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

        if not user.username or not user.authenticate(password):
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
        user = User.query.get(id)
        if not user:
            return {'error': 'user not found'}, 404
        return user.to_dict(rules=('-bookings',)), 200
# updating the username
    def patch(self, id):

        user = User.query.get(id)
        data = request.get_json()
        if not user:
            return {'error': 'user not found'}, 404
        
        if 'username' not in data:
            return {'errors': ['Username missing from request']}, 400
        
    
        try:
            user.username = data['username']

            db.session.add(user)
            db.session.commit()
            return {'message': 'Updated successfully!', 'user': user.to_dict(rules=('-bookings',))}, 202
        except ValueError:
            return {'errors': ['validation errors']}, 400
# deleting the user
    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return {'error': 'user not found'}, 404
        db.session.delete(user)
        db.session.commit()
        return {}, 204


# endpoint to get all users
class Users(Resource):
    def get(self):
        users = [user.to_dict(rules=('-bookings',)) for user in User.query.all()]
        return users, 200


# endpoint for getting all rentals for rental page and creating one
class Rentals(Resource):
    def get(self):
        rentals = [rental.to_dict(rules=('-bookings',)) for rental in Rental.query.all()]
        return rentals, 200
    def post(self):
        data = request.get_json()
        try:
            new_rental = Rental(
                name = data['name'],
                location = data['location'],
                price = data['price'],
                description = data['description'],
                image = data['image']
            )
            db.session.add(new_rental)
            db.session.commit()
            return new_rental.to_dict(rules=('-bookings',)), 201
        except ValueError:
            return {'errors': ['validation errors']}, 400

# endpoint for getting all bookings
class Bookings(Resource):
    def get(self):
        bookings = [booking.to_dict(rules=('-user', '-rental',)) for booking in Booking.query.all()]
        return bookings, 200
    def post(self):
        data = request.get_json()
        try:
            start_date = datetime.fromisoformat(data['start_date'].replace('Z', '+00:00'))
            end_date = datetime.fromisoformat(data['end_date'].replace('Z', '+00:00'))


            new_booking = Booking(
                user_id = data['user_id'],
                rental_id = data['rental_id'],
                start_date = start_date,
                end_date = end_date
            )
            
            db.session.add(new_booking)
            db.session.commit()
            return new_booking.to_dict(rules=('-user', '-rental',))
        except ValueError:
            return {'errors': ['validation errors']}, 400
        
# get booking with specific rental

class BookingForRental(Resource):
    def get(self, rental_id):
        bookings = [booking.to_dict(rules=('-user', '-rental',)) for booking in Booking.query.filter_by(rental_id=rental_id)]
        return bookings, 200
# deletes booking from user

class BookingsById(Resource):
    def delete(self, id):
        booking = Booking.query.get(id)
        if not booking:
            return {'error': 'booking not found'}, 404
        db.session.delete(booking)
        db.session.commit()
        return {'message': 'Booking deleted successfully'}, 204
    
api.add_resource(BookingForRental, '/bookings/<int:rental_id>')  
api.add_resource(BookingsById, '/bookings/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(Bookings, '/bookings')
api.add_resource(Rentals, '/rentals')    
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


