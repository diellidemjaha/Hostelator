## Hostelator - Your Ultimate Apartment Booking Platform

Hostelator is a feature-rich web application that empowers users to seamlessly search, post, and book apartments. Built with the latest technologies such as PHP Laravel for the backend, React for the frontend, and MySQL for the database, Hostelator offers a user-friendly experience for both hosts and guests.

### Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Database Structure](#database-structure)
- [Contribution](#contribution)
- [License](#license)

## Features

- **User-friendly Interface:** Hostelator provides an intuitive and visually appealing platform for users to explore, post, and book apartments effortlessly.

- **Apartment Search:** Users can freely search for apartments using various filters such as thumbnail, title, price per night, and owner identity.

- **Effortless Apartment Posting:** Registered users can easily post their apartments with details like map location, image gallery, amenities, title, description, and price per night.

- **Real-time Updates:** Hosts can update their apartment listings, ensuring that the information stays relevant and attractive to potential guests.

- **Smart Reservations Management:** The platform facilitates instant reservation notifications, allowing hosts to confirm or decline requests. The calendar provides a clear view of available dates, and a built-in price calculator ensures accurate booking.

- **Earnings Tracking:** The "My Earnings" module allows users to track earnings from pending, approved, and canceled reservations, providing a comprehensive overview of financial success.

## Tech Stack

- **Backend:** PHP Laravel, including controllers, models, and routes.
  
- **Frontend:** React library, Bootstrap 5.0 for styling.

- **Database:** MySQL for secure and scalable data management.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [PHP](https://www.php.net/manual/en/install.php)
- [Composer](https://getcomposer.org/download/)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [MySQL](https://dev.mysql.com/downloads/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/diellidemjaha/hostelator.git
    ```

2. Navigate to the project directory:

    ```bash
    cd hostelator
    ```

3. Install PHP dependencies:

    ```bash
    composer install
    ```

4. Install JavaScript dependencies:

    ```bash
    npm install
    ```

5. Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

6. Configure your `.env` file with database information and other necessary details.

7. Migrate the database:

    ```bash
    php artisan migrate
    ```

8. Generate application key:

    ```bash
    php artisan key:generate
    ```

9. Start the development server:

    ```bash
    php artisan serve
    ```

Hostelator should now be running locally at `http://localhost:8000`.

## Database Structure

The application uses several tables to store essential information. You can find the table structures in the migration files. Some key tables include:

- `users`: Stores user information.
- `edit_user_profile`: Stores the updates on the user's profile.
- `apartments`: Contains details about posted apartments.
- `apartment_images`: Manages images associated with each apartment.
- `reservations`: Handles reservation information, including dates and prices.

To set up the database, run the following command:

```bash
php artisan migrate
