# SmartBrain-api - Dockerized
Final project for Udemy course - using Docker

1. Clone this repo
2. Make sure you have docker installed and running on your computer
3. Run `docker-compose up` ( you may have to run `docker-compose up --build` for the first setup phase)
4. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API.
5. You will also need to update Line 22 in server.js to your client app port

To access backend's bash:
Run `docker-compose exec smart-brain-api bash`

To access postgres: (adjust PORT number if needed)
Run  `psql postgres://<username>:<password>@localhost:5432/smart-brain`

To access redis:
Run `docker-compose exec redis redis-cli`

You can grab Clarifai API key [here](https://www.clarifai.com/)
