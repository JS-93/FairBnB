# FairBnB App

## Summary

FairBnb is a rental website clone designed to allow users to create fake rental properties so other users might be able to book them for certain dates on a calendar. The user must sign up in the application before logging in. The application is part of a full-stack project utilizing Flask-SQLAlchemy and python in the backend and React in the frontend. 

* Note: any mention of user instance is the user.id and it's attributes associated with the client, (user), using the application.

## Backend Structure

The app's design begins with a schema of three models: Bookings, Users, and Rentals. A user instance can book many rentals and a rental can be booked by many user instances. The schema is made in the models.py file. All models have a primary key ID associated with them.

### Models.py

The User model includes:
 * a unique username that's a string.
 * a _password_hash used for securing passwords.
      - using @hybrid_property and @password.setter, a password can be created and will be assigned to a crpytographically secure string using the bcrypt library. The authenticate method will check if the password is not None and see if a plaintext password, (after being hashed), matches the stored hashed password.

 * a bookings relationship so the user instance can get access to rentals..

The Rental model indlues:
* a name of the property that's a string.
* a location of the property that's a string.
* a price of the property that's an integer.
* a description of the property that's a string.
* an image of the property that's a string
* a bookings relationship so the rental can be booked by many user instances.

The Booking model includes:
* a user_id so the user instance can connect to the booking table.
* a rental_id so the rental can connect to the booking table.
* a start_date so the user instance knows when the first day they book the rental is.
* an end_date so the user instance knows when the last day their rental is booked.

### Seed.py

The seed file allows quick data to populate the model tables and can be deleted and repopulated at any time using python seed.py in the server directory.

### Config.py

A basic configuration file that incorporates Bcrypt for password hashing, Flask-Migrate for database migrations, Flask-RESTful for API use, SQLite to create the database, and CORS for backend security and frontend integration with React.

### App.py

The App file builds the Api that data will be fetched from to the frontend. Since the app uses authorization and sessions, the beginning views will create get and post requests to make sure the user can login, stay in the application while logged in using CheckSession, and log out. The rest of the views work with the models using patch, delete, post, and get so the user can implement full CRUD methods on the data being saved.  

## Components on the Frontend

The application consists of 14 components to handle the various routes and rendering of data on to the screen for the user. The useEffect and useState hooks were used often for optimistic and conditional rendering of the data. Formik, Yup, and the Datepicker libraries were used for form creation, error handling/data validation, and lastly a visual calendar representation for the user so they could pick dates to book a rental.

### App.js

The check_session and logout controllers were fetched first so the user instance could be verified after logging in and logging out. The handleUpdate and handleLogin functions were important in making sure the user instance was the 'user' and the currentUser state could be set to the user_id for the rest of the application session. The JSX returned in this component consisted of the routing logic for the entire application and was important in making the NavBar component functional. Any time a user is not logged in and attempts to click on any link on the navbar they will stay at the login page. The user is able to go between the signup and login page until they login.

### Signup.js

This component creates a new user instance after filling out a form. Formik and Yup were used for frontend form validation and error handling. The error state was used to handle a bad respone from the backend if a username was not unique and render that message to the user. Conditional rendering was also used with the isSignedUp state to give a link back to the user in order to go back to the login frontend route and sign in for the first time.

### Login.js

The login component was very similar to the signup component with using formik for data input and form submission and having an isLoggedIn state so the user could see whether or not the username or password were found or not. With a successful login, the user is immediately taken to the homepage that welcomes the user and invites them to enter the seerentals route.

### SeeRentals.js, RentalContainer.js, ###RentalCard.js

* The see rentals page is a simple fetch to all the rentals in the database first created in the seed.py file. The SeeRentals component fetches all the rentals using a get request and sets them into a rentals state to be passed down to the next component along with a user state passed down from the App.js. For organization sake, the entire seerentals route on the user side is separated into three components to separate various functions. 

* The RentalContainer component maps over the rentals state and passes down the attributes of a rental along with the user state to finally handle the logic in the RentalsCard component that is returned as JSX into a list.

* The RentalsCards component primarily uses a post request to create a new booking through the user instance that was sent down from the RentalsContainer, imports a Datepicker library to be used into sending new bookings for a particular rental and the user instance, and uses parsing date functions to convert the data returned by the server.

On the functionality in the RentalCard Component:

* formatDate and parseDate help to return more appealing date formatting into a JS 'Date' object.
* getDatesBetween helps to get all the dates between a start and end date for the post request of a booking.
* the useEffect hook is used for a fetch of all the bookings with a particular rental id that has a forEach loop that parses the dates using the previous function parseDate and sets the state of bookedDates to optimistically render on the calendar so a user can immediately see what dates are taken for a rental. 
* the POST request uses formik to input the new dates when a user makes a new booking for a rental. There is initial error handling for conditional rendering using set message to see if a user has inputted both start and end dates. 
* For a new booking, the start and end date must be parsed into toISOString() so the backend can read the request. 
*  The new selected dates are added to the bookedDates state so the useEffect hook can make another request and when the post request is successful, the dates are taken from the calendar and another user can't select them for that specific rental.

### Bookings.js, BookingContainer.js, BookingCard.js

* The Bookings component is used to show all the bookings for a specific user instance. The initial goal was to render out all the bookings for a particular user instance that included the image and description of the rental that the user had booked. The organization structure had to be separated into several components once again so each file wouldn't look too 'crowded'.

* Once the userBookings and setBookings are sent down to the BookingsContainer component, a useEffect hook fetches the rentals, and the userBookings is mapped over to find the rental.id that matches a booking.rental_id. The filtering is assigned to a bookingCard that can have an image, location, description, and the booking time of the user.

* The bookingCard is rendered as a list much like the rental card but includes information about the particular rental along with the booking. The bookingCard has a handle delete method so the user can delete the booking at any time. The setBookings state is used to finally set the userBookings once it has been deleted and can render immediately.

### AddRental.js

The AddRental component uses a post request to the rentals view to create a new rental. The user can add this rental to the seeRentals list so other users can book it. formik and Yup are used for data validation and error handling.

### UpdateDelete.js

The UpdateDelete component can update the username of a user instance that's assigned to the user and delete it. Each fetch makes a request to the users/id view. Confirmation is held in state so the user can verify the decision of deleting their user instance when given a prompt. Message is held in state so a user can get feedback on if the username they would like to change to is taken or if their new username is updated successfully. A successful update will automatically render on the screen due to a handleUpdate function passed down.

### Logout.js

The logout component uses a useEffect loop to immediately log out the user and redirect the user immediately to the login page, successfully clearing the session with a fetch to the logout controller.

### On Personal Use

After forking and cloning this repository, run pipenv install && pipenv shell for the backend in the parent directory. To run the frontend, run npm install --prefix client for the frontend. All the .py files are in the server folder and all the .js files are in the client folder. 

* cd into the server folder in one terminal and make sure the database is opened.
* run python seed.py to seed the database and python app.py to run the backend server.
* from another terminal cd into the client folder and run npm start to begin the app.


Reach out if you have any questions -Joe




