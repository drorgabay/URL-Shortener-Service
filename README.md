# Introduction
This Node.js application provides a URL shortening service, similar to bit.ly, with a focus on high throughput and low latency. The service is built using Node.js and Express, leveraging MongoDB as the primary database and Redis for caching, ensuring quick response times even under heavy load.

## Features
* **URL Shortening:** Converts long URLs into short, manageable links.
* **High Performance:** Utilizes Redis for caching and MongoDB for persistent storage, delivering fast response times.
* **Persistence:** MongoDB is used as a primary database, ensuring data is not lost if Redis cache fails.
* **TTL Support:** MongoDB is configured with TTL (Time To Live) indexes, automatically cleaning up expired data.

## Technology Stack
* **Node.js & Express:** For building the server and handling HTTP requests.
* **Redis:** An in-memory data store used as a cache.
* **MongoDB:** A NoSQL database used for persistent storage
* **shortid:** A module to generate short, unique IDs for URL mapping.

# Why These Choices?
* **Node.js & Express:** Ideal for building scalable and fast network applications, perfect for a service prioritizing high throughput and low latency.
* **Redis:** Provides extremely fast read and write operations, enhancing the application's response time.
* **MongoDB:** Initially, the primary choice for the remote database was a key-value store known for its fast access and maintenance capabilities, making DynamoDB an ideal candidate. DynamoDB, offered by AWS, is renowned for its high performance, scalability, and seamless integration in cloud environments.
However, since DynamoDB cannot be run locally and this application is not in a production environment or using a micro-services architecture, MongoDB was chosen as an alternative. MongoDB, a NoSQL database, is well-suited for this application for several reasons like local development, data persistence, scalability and more.
* **shortid:** Generates short, unique URLs efficiently, which is key for a URL shortening service.

## Installation
### Prerequisites
Before running the application, ensure you have the following installed for Windows:

* **Node.js:** Download and install Node.js from [here](https://nodejs.org/en/download).
* **MongoDB Community Server:** Download and install MongoDB Community Server from [here](https://www.mongodb.com/try/download/community) and run mongod.exe to run MongoDB locally.
* **Redis:** For Windows users, download redis-x64-3.2.100.zip from [here](https://github.com/microsoftarchive/redis/releases/tag/win-3.2.100) and run redis-server.exe to run Redis locally.
  
### Setting Up the Application
Follow these steps to set up and run the application:

* **Clone the Repository:** Clone or download the application code to your local machine.
* **Install Dependencies:** Navigate to the application directory in the terminal and run npm install to install the required Node.js modules listed in package.json.
* **Start MongoDB:** Run the MongoDB server on your machine.
* **Start Redis:** Execute redis-server.exe to start the Redis server.
* **Run the Application:** Execute node app.js (or your main application file) to start the URL shortening service.

## Local Development and Testing
In this local development setup, running the application includes starting both the Redis and MongoDB servers. You can perform operations as usual with the application under this setup.

### Testing Persistence and Cache Reconnection
To test the application's persistence and cache reconnection capabilities:

* **Start the Application with Redis and MongoDB Running:** This is the normal operation mode.
* **Stop the Redis Server:** This simulates a cache failure. The application will continue to run, but it's important to note that since this application depends on both Redis and MongoDB and is running in a local development environment, to test data persistence, it's crucial to restart the Redis server after stopping it.
* **Restart the Redis Server:** Restart the Redis server. The application should automatically re-establish the connection to the Redis server and resume its full functionality, and you can see that after the reconncetion, the data was found in the remoteDB.
This process helps demonstrate how the application manages unexpected Redis downtimes and ensures data persistence through MongoDB. In a production environment, a different process would be used to monitor the connection status of each database and manage recovery, without a direct dependency on local servers.

## API Documentation for Node.js URL Shortener Service
### Overview
This document outlines the API endpoints for the URL shortening service. The service provides endpoints to create shortened URLs and to redirect to the original URLs using their shortened versions.

### Base URL
For local development, the base URL is: "http://localhost:3000"

### Endpoints
#### Create Short URL
* **URL:** /shorturls
* **Method:** POST
* **Description:** This endpoint is used to create a new short URL.
* **Request Body:**
url (String, Required): The original URL to be shortened.
* **Success Response:**
  * **Code:** 200 OK
  * **Content:** { "shortUrl": "http://localhost:3000/shortUrlId" }

* **Error Response Options:**
  * **Code:** 400 Bad Request, 500 Internal Server Error
  * **Content:** {  "error": "URL is required"  }, { "error": "Invalid URL" } , { "error": "Internal Server Error" }

#### Redirect to Original URL
* **URL:** /:shortUrl
* **Method:** GET
* **Description:** Accessing this endpoint redirects the user to the original URL corresponding to the provided short URL.
* **URL Params:** shortUrl (String, Required): The unique identifier for the shortened URL.
* **Success Response:**
  * **Code:** 302 Found
  * **Content:** Redirects to the original URL.

* **Error Response Options:**
  * **Code:** 404 Not Found, 500 Internal Server Error
  * **Content:** "URL not found", "Internal Server Error"
 
# The following diagram provides a visual representation of the architecture and workflow of my URL shortener service.
![image](https://github.com/drorgabay/URL-Shortener-Service/assets/81250590/8e1f3087-d14e-4c7b-9c3c-301c572aed45)


