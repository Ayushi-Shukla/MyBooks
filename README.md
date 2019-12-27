# MyBooks

## Problem Statement

Build a system to search for a book title, show results and add book to favourite list.

## Requirements

- The application needs to fetch book details the following Open Library API.
    1. https://openlibrary.org/developers/api

    2. Refer the following URLs to explore more on the Books open library APIs.
        - https://openlibrary.org/dev/docs/api/search
        - https://openlibrary.org/dev/docs/api/books

- A frontend where the user can register/login to the application, search books by string, title or author, get books details and add book to favourite list.
- User can add book to favourite list and should be able to view the favourite list.

## Modules

### UserService - should be able to manage user accounts.
### UI (User interface) -  should be able to
- Search a book by string, title or author
- View book details
- Add a book to favourite list
- should be able to see favourite books
- UI should be responsive which can run smoothly on various devices 
### FavouriteService - should be able to store and retrieve all the favourite books for a user

## Tech Stack
- Spring Boot
- Angular
- CI (Gitlab Runner)
- Docker, Docker Compose

## Flow of Modules 

### Building frontend
- Building responsive views: 
    1. Register/Login
    2. Search for a book
    3. Book list - populating from external API
    4. Build a view to show favourite books
- Using Services to populate these data in views
- Stitching these views using Routes and Guards
- Making the application Responsive/Progressive
- E2E test cases and unit test cases
- Writing CI configuration file
- Dockerize the frontend

### Building the UserService
- Creating a server in Spring Boot to facilitate user registration and login using JWT token and MySQL
- Writing swagger documentation 
- Unit Testing 
- Write CI Configuration 
- Dockerize the application
- Write docker-compose file to build both frontend and backend application

### Building the Favourite Service
- Building a server in Spring Boot to facilitate CRUD operation over favourite books stored in MySQL
- Writing Swagger Documentation
- Write Test Cases
- Write CI Configuration
- Dockerize the application
- Update the docker-compose

### Demonstrate the entire application