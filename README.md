
***Hostelator - Your Ultimate Apartment Booking Platform***
Hostelator is a feature-rich web application that empowers users to seamlessly search, post, and book apartments. Built with the latest technologies such as PHP Laravel for the backend, React for the frontend, and MySQL for the database, Hostelator offers a user-friendly experience for both hosts and guests.

***Table of Contents***
***Features***
Tech Stack
Getting Started
Prerequisites
Installation
Database Structure
Contribution
License
Features
User-friendly Interface: Hostelator provides an intuitive and visually appealing platform for users to explore, post, and book apartments effortlessly.

Apartment Search: Users can freely search for apartments using various filters such as thumbnail, title, price per night, and owner identity.

Effortless Apartment Posting: Registered users can easily post their apartments with details like map location, image gallery, amenities, title, description, and price per night.

Real-time Updates: Hosts can update their apartment listings, ensuring that the information stays relevant and attractive to potential guests.

Smart Reservations Management: The platform facilitates instant reservation notifications, allowing hosts to confirm or decline requests. The calendar provides a clear view of available dates, and a built-in price calculator ensures accurate booking.

Earnings Tracking: The "My Earnings" module allows users to track earnings from pending, approved, and canceled reservations, providing a comprehensive overview of financial success.

***Tech Stack***
Backend: PHP Laravel, including controllers, models, and routes.

Frontend: React library, Bootstrap 5.0 for styling.

Database: MySQL for secure and scalable data management.

***Getting Started***
Prerequisites
Ensure you have the following installed:

PHP
Composer
Node.js
npm
MySQL

***Installation***
Clone the repository:

bash
Copy code
```git clone https://github.com/your-username/hostelator.git```
Navigate to the project directory:

bash
Copy code
```cd hostelator```
Install PHP dependencies:

bash
Copy code
```composer install```
Install JavaScript dependencies:

bash
Copy code
```npm install```
Copy the .env.example file to .env:

bash
Copy code
```cp .env.example .env```
Configure your .env file with database information and other necessary details.

Migrate the database:

bash
Copy code
```php artisan migrate```
Generate application key:

bash
Copy code
```php artisan key:generate```
Start the development server:

bash
Copy code
```php artisan serve```
Hostelator should now be running locally at http://localhost:8000.

***Database Structure***
The application uses several tables to store essential information. You can find the table structures in the migration files. Some key tables include:

users: Stores user information.
apartments: Contains details about posted apartments.
apartment_images: Manages images associated with each apartment.
reservations: Handles reservation information, including dates and prices.
To set up the database, run the following command:

bash
Copy code
```php artisan migrate```

***License***
Hostelator is open-source software licensed under the MIT License.
