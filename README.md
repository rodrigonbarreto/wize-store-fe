# Store Front-End

## Overview
This project is the front-end interface of the  Store BE , built using React. 
Below are the instructions to set up and run the project.

## Requirements
    * Node.js (version 20.11.0)
    * Docker (optional, but recommended)

## Environment Setup

### Install project dependencies:
    * If the `.env` file is not present in the project, copy the `.env.example` file and rename it to `.env.
    * Add the backend URL to the .env file.

## Running the Project
### With Docker

```bash
docker-compose build
docker-compose up -d
```

- Open your browser and go to `http://localhost:5001/`


### Without Docker
```bash
npm install
npm start
```


## User Features
    * Login: Users can log in.
    * Manage Cart: Users can add and remove items from the cart.
    * Checkout: Users can checkout, creating an order.
    * List Orders: Users can list all their orders.

## Technical Details
- The ports used by the project are defined in the Dockerfile and docker-compose.yml files.

## BE Repository
[Store BE](https://github.com/rodrigonbarreto/wize-store-be)