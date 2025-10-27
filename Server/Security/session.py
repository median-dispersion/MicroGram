import uuid
import secrets
from Security import password
from datetime import datetime, timezone, timedelta
from Database import database

# Session token size in bytes
TOKEN_SIZE_BYTES = 128

# Session token expiration time in seconds
TOKEN_EXPIRATION_SECONDS = 60 * 60 * 24 * 7

# =================================================================================================
# Create a new session
# =================================================================================================
def create(user_id: int):

    # Generate a token
    session_token = secrets.token_hex(TOKEN_SIZE_BYTES)

    # Hash the token
    hashed_token = password.hash(session_token)

    # Set dates
    created = datetime.now(timezone.utc)
    last_used = created
    expires = created + timedelta(seconds=TOKEN_EXPIRATION_SECONDS)

    # Convert dates to ISO strings
    created = created.isoformat()
    last_used = last_used.isoformat()
    expires = expires.isoformat()

    # Get a database session
    with database.session() as database_session:

        # Loop until a user session was inserted
        # It might fail because the generated session uuid was not unique
        # This is very unlikely but not impossible
        while database_session.rowcount < 1:

            # Generate a session uuid
            session_uuid = str(uuid.uuid4())

            # Insert the user session
            database_session.execute(
                "INSERT OR IGNORE INTO `sessions` (`uuid`, `user_id`, `token`, `created`, `last_used`, `expires`) VALUES (?, ?, ?, ?, ?, ?);",
                (session_uuid, user_id, hashed_token, created, last_used, expires)
            )

    # Return the user session
    return {

        "uuid": session_uuid,
        "token": session_token

    }

# =================================================================================================
# Validate a user session and return the user ID
# =================================================================================================
def user_id(session_uuid: str, session_token: str):

    # Get a database session
    with database.session() as database_session:

        # Select the user session based on the session uuid
        user_session = database_session.execute(
            "SELECT * FROM `sessions` WHERE `uuid` = ?;",
            (session_uuid,)
        ).fetchone()

        # Check if a user session was selected
        if user_session is not None:

            # Check if the user session expired
            if datetime.fromisoformat(user_session["expires"]) < datetime.now(timezone.utc):

                # Remove the expired user session
                database_session.execute(
                    "DELETE FROM `sessions` WHERE `id` = ?;",
                    (user_session["id"],)
                )

            # If the user session is not expired
            else:

                # Check if the session token is valid
                if password.valid(session_token, user_session["token"]):

                    # Check if the session token hash is obsolete and needs rehashing
                    if password.obsolete(user_session["token"]):

                        # Update the user session with the rehashed session token
                        database_session.execute(
                            "UPDATE `sessions` SET `token` = ? WHERE `id` = ?;",
                            (password.hash(session_token), user_session["id"])
                        )

                    # Set new dates
                    last_used = datetime.now(timezone.utc)
                    expires = last_used + timedelta(seconds=TOKEN_EXPIRATION_SECONDS)

                    # Convert dates to ISO strings
                    last_used = last_used.isoformat()
                    expires = expires.isoformat()

                    # Update the user session
                    database_session.execute(
                        "UPDATE `sessions` SET `last_used` = ?, `expires` = ? WHERE `id` = ?;",
                        (last_used, expires, user_session["id"])
                    )

                    # Return the user ID
                    return user_session["user_id"]

    # Return no user ID
    return None