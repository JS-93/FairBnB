from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

# Models go here!



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)
    bookings = db.relationship('Booking', backref='user', cascade='all, delete-orphan')
   
    serializer_rules= ('-bookings.user',)

   
    

    @hybrid_property
    def password(self):
        raise AttributeError('Cannot view password hashes.')
    
    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
   
    def authenticate(self, password):
        if not password:
            return False
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}, ID {self.id}>'
    


class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)
    location = db.Column(db.String, nullable = False)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    image = db.Column(db.String)
    bookings = db.relationship('Booking', backref='rental', cascade='all, delete-orphan')


    serializer_rules = ('-bookings.rental',)


    def __repr__(self):
        return f'<Rental {self.name}, ${self.price}/per night, {self.location}>'

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    serializer_rules = ('-user.bookings', '-rental.bookings',)

    def __repr__(self):
        return f'<Booking {self.id}, {self.start_date}, {self.end_date}>'


