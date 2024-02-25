Introduction
This Node.js application provides a URL shortening service, similar to bit.ly, with a focus on high throughput and low latency. The service is built using Node.js and Express, leveraging MongoDB as the primary database and Redis for caching, ensuring quick response times even under heavy load.

Features
URL Shortening: Converts long URLs into short, manageable links.
High Performance: Utilizes Redis for caching and MongoDB for persistent storage, delivering fast response times.
Fault Tolerance: Handles cache unavailability by falling back to MongoDB, ensuring uninterrupted service.
Persistence: MongoDB is used as a primary database, ensuring data is not lost if Redis cache fails.
TTL Support: MongoDB is configured with TTL (Time To Live) indexes, automatically cleaning up expired data.

Technology Stack
Node.js & Express: For building the server and handling HTTP requests.
Redis: An in-memory data store used as a cache.
MongoDB: A NoSQL database used for persistent storage
shortid: A module to generate short, unique IDs for URL mapping.

Why These Choices?
Node.js & Express: Ideal for building scalable and fast network applications, perfect for a service prioritizing high throughput and low latency.
Redis: Provides extremely fast read and write operations, enhancing the application's response time.
MongoDB: Initially, the primary choice for the remote database was a key-value store known for its fast access and maintenance capabilities, making DynamoDB an ideal candidate. DynamoDB, offered by AWS, is renowned for its high performance, scalability, and seamless integration in cloud environments.
However, since DynamoDB cannot be run locally and this application is not in a production environment or using a micro-services architecture, MongoDB was chosen as an alternative. MongoDB, a NoSQL database, is well-suited for this application for several reasons:
shortid: Generates short, unique URLs efficiently, which is key for a URL shortening service.

Installation
Prerequisites
Before running the application, ensure you have the following installed:

Node.js: Download and install Node.js from here.
MongoDB Community Server: Download and install MongoDB from MongoDB Community Server and run mongod.exe to run MongoDB locally.
Redis: For Windows users, download redis-x64-3.2.100.zip from Redis Windows 3.2.100 and run redis-server.exe to run Redis locally.
Setting Up the Application
Follow these steps to set up and run the application:

Clone the Repository: Clone or download the application code to your local machine.
Install Dependencies: Navigate to the application directory in the terminal and run npm install to install the required Node.js modules listed in package.json.
Start MongoDB: Run the MongoDB server on your machine.
Start Redis: Execute redis-server.exe to start the Redis server.
Run the Application: Execute node app.js (or your main application file) to start the URL shortening service.

Local Development and Testing
In this local development setup, running the application includes starting both the Redis and MongoDB servers. You can perform operations as usual with the application under this setup.

Testing Persistence and Cache Reconnection
To test the application's persistence and cache reconnection capabilities:

Start the Application with Redis and MongoDB Running: This is the normal operation mode.
Stop the Redis Server: This simulates a cache failure. The application will log to the console that the Redis client is disconnected but will continue to run, using MongoDB for data retrieval.
Restart the Redis Server: The application will automatically reconnect to Redis, demonstrating the cache reconnection capability.
This process helps demonstrate how the application manages unexpected Redis downtimes and ensures data persistence through MongoDB. In a production environment, a different process would be used to monitor the connection status of each database and manage recovery, without a direct dependency on local servers.
