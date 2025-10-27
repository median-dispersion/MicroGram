from Database import database
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
# Initialize database
database.initialize()

# Server
server = FastAPI()

# Serve static files from the client directory
server.mount("/", StaticFiles(directory="../Client", html=True), name="Client")