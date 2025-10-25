from fastapi import APIRouter
from API.User import user

# Router
router = APIRouter(prefix="/API")

# Connect routes
router.include_router(user.router)