from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

server = FastAPI()

server.mount("/", StaticFiles(directory="../Client", html=True), name="Client")