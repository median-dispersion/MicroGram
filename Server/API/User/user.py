from fastapi import APIRouter
from API.User import sign_up, login

# Router
router = APIRouter(prefix="/User")

# Connect routes
router.include_router(sign_up.router)
router.include_router(login.router)