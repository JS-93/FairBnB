from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db

# Models go here!


wishlist_table = db.Table('wishlist', db.Column(
    'user_id', db.Integer, db.ForeignKey('users.id'), primary_key = True
), db.Column(
    'rental_id', db.Integer, db.ForeignKey('rentals.id'), primary_key = True
))

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String, nullable = False)
    reviews = db.relationship('Review', backref='user', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', backref='user', cascade='all, delete-orphan')
    wishlist = db.relationship('Rental', secondary=wishlist_table, back_populates='wishlist_users')
    serialize_rules=('-bookings.user', '-reviews.user',)

    def __repr__(self):
        return f'<User {self.username}, ID {self.id}>'
    
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'))

    serialize_rules = ('-user.reviews', '-rental.reviews',)

    def __repr__(self):
        return f'<Review {self.user_id}, {self.rental_id}, {self.rating}>'

class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)
    location = db.Column(db.String, nullable = False)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    image = db.Column(db.String)
    reviews = db.relationship('Review', backref='rental', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', backref='rental', cascade='all, delete-orphan')
    wishlist_users = db.relationship('User', secondary=wishlist_table, back_populates='wishlist')

    serialize_rules=('-bookings.rental', '-reviews.rental',)

    def __repr__(self):
        return f'<Rental {self.name}, ${self.price}/per night, {self.location}>'

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    serialize_rules = ('-user.bookings', '-rental.bookings',)

    def __repr__(self):
        return f'<Booking {self.id}, {self.start_date}, {self.end_date}>'

