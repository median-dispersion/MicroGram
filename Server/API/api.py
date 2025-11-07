from fastapi import APIRouter
from API.Routes import signup, login, units, user

# Router
router = APIRouter(prefix="/API")

# Connect routes
router.include_router(signup.router)
router.include_router(login.router)
router.include_router(units.router)
router.include_router(user.router)