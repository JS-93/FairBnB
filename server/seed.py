#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports


# Local imports
from app import app
from models import Booking, Rental, User, db
def seed():
    db.session.query(Booking).delete()
    db.session.query(Rental).delete()
    db.session.query(User).delete()
    db.session.commit()

    user1 = User(username= 'Bob')
    user2 = User(username="Jimmy")
    user3 = User(username='Amy')
    user1.password = 'password1234'
    user2.password = 'dog459'
    user3.password = 'sky72'

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    rental1 = Rental(name="Undisclosed Ridge", location="South Side, Washington", price=250, description="Secluded mountain-view cabin atop a popular ridge, STUNNING VIEWS!.", image='https://drive.google.com/uc?export=view&id=1c4DuQzUPrHP8PwbJKa1Uto-OgXrm5CA5')
    rental2 = Rental(name="Relaxation Station", location="Campground, Oregon", price=200, description="Quiet getaway cabin- enjoy nature and the hammock of course.", image='https://drive.google.com/uc?export=view&id=1qM1NdjZxmxZqVRVfqOZNUyNnxceZwnaV')
    rental3 = Rental(name="Lakeside Bungalow", location="Forgot Lake Name, Wyoming", price=140, description="Waterfront Cabin with a mountain ridge view and a boat for fishing!", image='https://drive.google.com/uc?export=view&id=1okGhf2vfN_X5PCSvpxSzs2jBZ8euJK8s')
    rental4 = Rental(name="Guilt Free Retreat", location="Some County, Idaho", price=60, description='100 percent solar powered gem. Clear your wasteful conscience with this energy saver.', image='https://drive.google.com/uc?export=view&id=1Rs9T4YLsWSej6kUvtXkaadPIfikcHbWY')
    rental5 = Rental(name="Cold Plains Tiny Home", location="Middle of Nowhere, Nebraska", price=30, description="Ain't much, but you won't have any trouble with crowds.", image='https://drive.google.com/uc?export=view&id=16ei4fuef4QCMUoIGtf5BDd-j8QYx8ZhG')
    rental6 = Rental(name="Basic Cabin in the Woods", location="Random Forest, Maine", price=20, description="Only cabin out here for miles! Isn't that great? ...", image='https://drive.google.com/uc?export=view&id=10dN_teQqK4M8foSMmugv7-9VFORZUZ2b')
    db.session.add_all([rental1, rental2, rental3, rental4, rental5, rental6])
    db.session.commit()


    booking1 = Booking(user_id=user1.id, rental_id=rental3.id, start_date=datetime(2023, 10, 20), end_date=datetime(2023, 10, 23))
    booking2 = Booking(user_id=user3.id, rental_id=rental2.id, start_date=datetime(2023, 10, 20), end_date=datetime(2023, 10, 23))
    booking3 = Booking(user_id=user1.id, rental_id=rental1.id, start_date=datetime(2023, 10, 20), end_date=datetime(2023, 10, 23))
    
    

    
    db.session.add_all([booking1, booking2, booking3])
    db.session.commit()





if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        seed()
        # Seed code goes here!
