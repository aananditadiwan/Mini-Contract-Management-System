# Mini Contract Manager

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for frontend development)
- [Python](https://www.python.org/) (for backend development)
- [Docker](https://www.docker.com/) (for PostgreSQL setup)
- [Uvicorn](https://www.uvicorn.org/) (for running Django with WebSockets)

### Setting up PostgreSQL with Docker

1. Ensure Docker is installed and running on your machine.
2. Run the following command to create a PostgreSQL container:
   ```bash
   docker run --name postgres_contracts -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -p 5435:5432 -d postgres
   ```
3. Access the PostgreSQL shell inside the container:
   ```bash
   docker exec -it postgres_contracts psql -U postgres
   ```
4. Create the database and schema:
   ```sql
   CREATE DATABASE contract_app;
   ```
5. Exit the PostgreSQL shell:
   ```bash
   \q
   ```

## Environment Variables

Create a `.env` file in the root directory of the backend and add the following:

```
MASTER_DBNAME=contract_app
MASTER_DBUSER=postgres
MASTER_DBPASSWORD=admin
MASTER_DBHOST=localhost
MASTER_DBPORT=5435
MASTER_SCHEMANAME=contract_db
VITE_API_URL=http://backendUrl:port/api/v1/contractApp
VITE_WS_URL=ws://backendUrl:port/ws/contractStatus/
```

## Local Development Guide

### Frontend (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend (Django + Uvicorn)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
4. Start the backend server with Uvicorn:
   #### Running on Windows
   ```bash
   uvicorn mini_contract_manager.asgi:application --reload
   ```
   #### Running on Linux
   ```bash
   uvicorn mini_contract_manager.asgi:application --reload
   ```

Your backend should now be running and accessible at `http://127.0.0.1:8000/api/v1/`.

## Notes

- Ensure Docker is running when working with PostgreSQL.
- Uvicorn is required for WebSocket support in Django.
- The frontend and backend should be run in separate terminal windows.



