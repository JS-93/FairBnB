#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports


# Local imports
from app import app
from models import Booking, Review, wishlist_table, Rental, User, db
def seed():
    db.session.query(Booking).delete()
    db.session.query(Review).delete()
    db.session.query(wishlist_table).delete()
    db.session.query(Rental).delete()
    db.session.query(User).delete()
    db.session.commit()

    user1 = User(username= 'Bob', password='Doggo')
    user2 = User(username="Jimmy", password='Catto')
    user3 = User(username='Amy', password='Birdo')

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    rental1 = Rental(name="Bear Cove", location="Country Side", price=150, description="Quiet")
    rental2 = Rental(name="Tiger Ridge", location="Mountains", price=200, description="High up")
    rental3 = Rental(name="Waterside Lodge", location="Ocean Front", price=120, description="Waterfront")

    db.session.add_all([rental1, rental2, rental3])
    db.session.commit()

    user1.wishlist.append(rental2)
    user2.wishlist.append(rental3)
    user3.wishlist.append(rental1)

    booking1 = Booking(user_id=user1.id, rental_id=rental3.id, start_date=datetime(2023, 10, 20), end_date=datetime(2023, 10, 23))
    
    db.session.add(booking1)
    db.session.commit()




    review1 = Review(rating=4, comment="Very accommodating!", user_id=user1.id, rental_id=rental1.id)
    review2 = Review(rating=2, comment="Could be much better..", user_id=user2.id, rental_id=rental2.id)

    db.session.add_all([review1, review2])

    db.session.commit()



if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        seed()
        # Seed code goes here!
