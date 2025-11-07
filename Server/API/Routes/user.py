from fastapi import APIRouter, Cookie
from Security import session
from fastapi.responses import JSONResponse
from Database import database

# Router
router = APIRouter(prefix="/User")

# =================================================================================================
# Get the user name
# =================================================================================================
@router.get("/Name")
def name(
    session_uuid: str | None = Cookie(default=None),
    session_token: str | None = Cookie(default=None)
):

    # Get the user ID from the session
    user_id = session.user_id(session_uuid, session_token)

    # Check if no user ID was extracted from the session
    if user_id is None:

        # Return a 401 response
        return JSONResponse(status_code=401, content={"message": "No valid authorization provided!"})

    # Get a database session
    with database.session() as database_session:

        # Get the user from the extracted user ID
        user = database_session.execute(
            "SELECT `name` FROM `users` WHERE `id` = ?;",
            (user_id,)
        ).fetchone()

    # Return the user name
    return JSONResponse(status_code=200, content={
        "name": user["name"]
    })