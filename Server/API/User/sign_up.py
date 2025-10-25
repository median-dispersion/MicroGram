from fastapi import APIRouter
from pydantic import BaseModel
from Security import password
from Database import database
from fastapi.responses import JSONResponse
from Security import jwt

# Router
router = APIRouter(prefix="/Sign-up")

# Sign up data
class SignUp(BaseModel):

    name: str
    username: str
    password: str

# =================================================================================================
# Sign up
# =================================================================================================
@router.post("")
def signUp(data: SignUp):

    # Hash the password
    data.password = password.hash(data.password)

    # Get a database session
    with database.session() as session:

        # Try to insert the user
        session.execute("INSERT OR IGNORE INTO `users` (`name`, `username`, `password`) VALUES (?, ?, ?)", (data.name, data.username, data.password))

        # Check if no rows were inserted, meaning the username already exists
        if session.rowcount == 0:

            # Return a 400 response
            return JSONResponse(status_code=400, content={

                "status": 400,
                "message": "Failed to sign up! Username already exists!"

            })

        # If user was inserted
        else:

            # Encode the user ID as a JWT authorization
            token = jwt.encode(session.lastrowid)

            # Return a 200 response with the JWT authorization
            return JSONResponse(status_code=200, content={

                "status": 200,
                "message": "Successfully signed up!",
                "token": token

            })