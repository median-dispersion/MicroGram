from Database import database
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from API import api

# Initialize database
database.initialize()

# Server
server = FastAPI()

# Connect API routes
server.include_router(api.router)

# Serve static files from the client directory
server.mount("/", StaticFiles(directory="../Client", html=True), name="Client")