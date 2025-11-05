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
    massUnit: uuid.UUID
    lengthUnit: uuid.UUID
    height: float

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

        # Get the mass unit and type
        mass_unit = database_session.execute(
            "SELECT `units`.`id` AS `unit_id`, `units`.`base` AS `unit_base`, `unit_types`.`id` AS `type_id` FROM `units` JOIN `unit_types` ON `units`.`unit_type_id` = `unit_types`.`id` WHERE `unit_types`.`id` = 1 AND `units`.`uuid` = ?;",
            (str(data.massUnit),)
        ).fetchone()

        # Check if no mass unit was selected
        if mass_unit is None:

            # Return a 404 response
            return JSONResponse(status_code=404, content={"message": "Mass unit not found!"})

        # Get the length unit and type
        length_unit = database_session.execute(
            "SELECT `units`.`id` AS `unit_id`, `units`.`base` AS `unit_base`, `unit_types`.`id` AS `type_id` FROM `units` JOIN `unit_types` ON `units`.`unit_type_id` = `unit_types`.`id` WHERE `unit_types`.`id` = 2 AND `units`.`uuid` = ?;",
            (str(data.lengthUnit),)
        ).fetchone()

        # Check if no length unit was selected
        if length_unit is None:

            # Return a 404 response
            return JSONResponse(status_code=404, content={"message": "Length unit not found!"})

        # Set the unique UUID flag to false
        unique_uuid = False

        # Loop until a user is inserted
        # It might fail because the generated user uuid was not unique
        # This is very unlikely but not impossible
        while not unique_uuid:

            # Generate a user uuid
            user_uuid = str(uuid.uuid4())

            # Try inserting the user
            try:

                # Insert the user
                database_session.execute(
                    "INSERT INTO `users` (`uuid`, `name`, `username`, `password`, `created`) VALUES (?, ?, ?, ?, ?);",
                    (user_uuid, data.name, data.username, data.password, created)
                )

                # Set the unique UUID flag to true
                unique_uuid = True

            # If a uniqueness constraint fails
            except sqlite3.IntegrityError as exception:

                # Check if the failed constraint was caused by the username
                if "username" in str(exception).lower():

                    # Return a 409 response
                    return JSONResponse(status_code=409, content={"message": "Username already exists!"})

        # Get the user ID
        user_id = database_session.lastrowid

        # Insert the user units
        database_session.execute(
            "INSERT INTO `user_units` (`user_id`, `unit_type_id`, `unit_id`) VALUES (?, ?, ?), (?, ?, ?);",
            (user_id, mass_unit["type_id"], mass_unit["unit_id"], user_id, length_unit["type_id"], length_unit["unit_id"])
        )

        # Set the unique UUID flag to false
        unique_uuid = False

        # Loop unit the UUID is unique
        while not unique_uuid:

            # Generate a UUID for the user height entry
            height_uuid = str(uuid.uuid4())

            # Try inserting the user height
            try:

                # Insert user height
                database_session.execute(
                    "INSERT INTO `user_heights` (`uuid`, `user_id`, `height_base`, `height`, `unit_id`) VALUES (?, ?, ?, ?, ?);",
                    (height_uuid, user_id, data.height * length_unit["unit_base"], data.height, length_unit["unit_id"])
                )

                # Set the unique UUID flag to true
                unique_uuid = True

            # If the uniqueness constraint fails do nothing
            except sqlite3.IntegrityError: pass

    # Create a new user session
    user_session = session.create(user_id)

    # Create a JSON response
    response = JSONResponse(status_code=200, content={"message": "Successfully signed up!"})

    # Set the user session tokens
    response.set_cookie(key="session_uuid", value=user_session["uuid"], httponly=True, secure=False, samesite="lax")
    response.set_cookie(key="session_token", value=user_session["token"], httponly=True, secure=False, samesite="lax")

    # Return a 200 response with session cookies
    return response