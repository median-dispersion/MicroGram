from fastapi import APIRouter
from pydantic import BaseModel
from Database import database
from Security import password
from fastapi.responses import JSONResponse
from Security import jwt

# Router
router = APIRouter(prefix="/Login")

# Login data
class Login(BaseModel):

    username: str
    password: str

# =================================================================================================
# Sign up
# =================================================================================================
@router.post("")
def login(data: Login):

    # JWT authorization
    token = None

    # Get a database session
    with database.session() as session:

        # Try and select the user based on the username
        user = session.execute("SELECT * FROM `users` WHERE `username` = ?", (data.username,)).fetchone()

        # Check if a user was selected
        if user:

            # Check if the password is valid
            if password.valid(data.password, user["password"]):

                # Check if the password hash is obsolete
                if password.obsolete(user["password"]):

                    # Update the password hash
                    session.execute("UPDATE `users` SET `password` = ? WHERE `id` = ?", (password.hash(data.password), user["id"]))

                # Generate JWT authorization
                token = jwt.encode(user["id"])

    # Check if a token was generated
    if token:

        # Return a 200 response with the JWT authorization
        return JSONResponse(status_code=200, content={

            "status": 200,
            "message": "Successfully logged in!",
            "token": token

        })

    # If no token was generated the login attempt failed
    else:

        # Return a 401 response
        return JSONResponse(status_code=401, content={

            "status": 401,
            "message": "Failed to log in! Invalid username or password!",

        })