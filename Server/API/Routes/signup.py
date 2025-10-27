from fastapi import APIRouter
from pydantic import BaseModel
from Security import password
from datetime import datetime, timezone
from Database import database
import sqlite3
import uuid
from fastapi.responses import JSONResponse
from Security import session

# Router
router = APIRouter(prefix="/Signup")

# Signup data
class SignUp(BaseModel):

    name: str
    username: str
    password: str

# =================================================================================================
# Signup
# =================================================================================================
@router.post("")
def signup(data: SignUp):

    # Hash the password
    data.password = password.hash(data.password)

    # Set the date
    created = datetime.now(timezone.utc)
    created = created.isoformat()

    # Get a database session
    with database.session() as database_session:

        # Loop until a user is inserted
        # It might fail because the generated user uuid was not unique
        # This is very unlikely but not impossible
        while database_session.rowcount < 1:

            # Generate a user uuid
            user_uuid = str(uuid.uuid4())

            # Try inserting the user
            try:

                # Insert the user
                database_session.execute(
                    "INSERT INTO `users` (`uuid`, `name`, `username`, `password`, `created`) VALUES (?, ?, ?, ?, ?);",
                    (user_uuid, data.name, data.username, data.password, created)
                )

            # If a uniqueness constraint fails
            except sqlite3.IntegrityError as exception:

                # Check if the failed constraint was caused by the username
                if "username" in str(exception).lower():

                    # Return a 409 response
                    return JSONResponse(status_code=409, content={"message": "Username already exists!"})

        # Get the user ID
        user_id = database_session.lastrowid

    # Create a new user session
    user_session = session.create(user_id)

    # Create a JSON response
    response = JSONResponse(status_code=200, content={"message": "Successfully signed up!"})

    # Set the user session tokens
    response.set_cookie(key="session_uuid", value=user_session["uuid"], httponly=True, secure=False, samesite="lax")
    response.set_cookie(key="session_token", value=user_session["token"], httponly=True, secure=False, samesite="lax")

    # Return a 200 response with session cookies
    return response