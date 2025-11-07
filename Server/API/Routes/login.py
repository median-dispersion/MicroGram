from fastapi import APIRouter
from pydantic import BaseModel
from Database import database
from Security import password
from fastapi.responses import JSONResponse
from Security import session

# Router
router = APIRouter(prefix="/Login")

# Sign up data
class Login(BaseModel):

    username: str
    password: str

# =================================================================================================
# Login
# =================================================================================================
@router.post("")
def login(data: Login):

    # User ID
    user_id = None

    # Get a database session
    with database.session() as database_session:

        # Try to select the user based on the username
        user = database_session.execute(
            "SELECT * FROM `users` WHERE `username` = ?;",
            (data.username,)
        ).fetchone()

        # Check if a user was selected
        if user is not None:

            # Check if the password is valid
            if password.valid(data.password, user["password"]):

                # Check if the password hash is obsolete and needs rehashing
                if password.obsolete(user["password"]):

                    # Update the user password with the rehashed password
                    database_session.execute(
                        "UPDATE `users` SET `password` = ? WHERE `id` = ?;",
                        (password.hash(data.password), user["id"])
                    )

                # Get the user ID from the selected user
                user_id = user["id"]

    # Check if the login failed and no user ID was selected
    if user_id is None:

        # Return a 401 response
        return JSONResponse(status_code=401, content={"message": "Invalid username or password!"})

    # If the login was successful
    else:

        # Create a new user session
        user_session = session.create(user_id)

        # Create a JSON response
        response = JSONResponse(status_code=200, content={"message": "Successfully logged in!"})

        # Set the user session tokens
        response.set_cookie(key="session_uuid", value=user_session["uuid"], httponly=True, secure=False, samesite="lax", max_age=31536000)
        response.set_cookie(key="session_token", value=user_session["token"], httponly=True, secure=False, samesite="lax", max_age=31536000)

        # Return a 200 response with session cookies
        return response