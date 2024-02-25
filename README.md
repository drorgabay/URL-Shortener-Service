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
MongoDB: A NoSQL database used for persistent storage.
shortid: A module to generate short, unique IDs for URL mapping.

Why These Choices?
Node.js & Express: Ideal for building scalable and fast network applications, perfect for a service prioritizing high throughput and low latency.
Redis: Provides extremely fast read and write operations, enhancing the application's response time.
MongoDB: Offers flexibility and scalability, with the added advantage of being more suitable for local development compared to DynamoDB.
shortid: Generates short, unique URLs efficiently, which is key for a URL shortening service.

Local Development and Testing
In this local development setup, running the application includes starting both the Redis and MongoDB servers. You can perform operations as usual with the application under this setup.

Testing Persistence and Cache Reconnection
To test the application's persistence and cache reconnection capabilities:

Start the Application with Redis and MongoDB Running: This is the normal operation mode.
Stop the Redis Server: This simulates a cache failure. The application will log to the console that the Redis client is disconnected but will continue to run, using MongoDB for data retrieval.
Restart the Redis Server: The application will automatically reconnect to Redis, demonstrating the cache reconnection capability.
This process helps demonstrate how the application manages unexpected Redis downtimes and ensures data persistence through MongoDB. In a production environment, a different process would be used to monitor the connection status of each database and manage recovery, without a direct dependency on local servers.
