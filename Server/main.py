from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from Database import database

database.initialize()

server = FastAPI()

server.mount("/", StaticFiles(directory="../Client", html=True), name="Client")