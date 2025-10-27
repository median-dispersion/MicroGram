from fastapi import APIRouter
from API.Routes import signup, login

# Router
router = APIRouter(prefix="/API")

# Connect routes
router.include_router(signup.router)
router.include_router(login.router)