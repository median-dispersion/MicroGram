from fastapi import APIRouter
from Database import database
from fastapi.responses import JSONResponse
from uuid import UUID

# Router
router = APIRouter(prefix="/Units")

# =================================================================================================
# Get all mass units
# =================================================================================================
@router.get("/Mass")
def mass():

    # Get a database session
    with database.session() as database_session:

        # Select all units
        units = database_session.execute(
            "SELECT `units`.`uuid`, `units`.`name`, `units`.`symbol` FROM `units` JOIN `unit_types` ON `units`.`unit_type_id` = `unit_types`.`id` WHERE `unit_types`.`id` = 1;"
        ).fetchall()

    # Return units as JSON
    return JSONResponse(status_code=200, content=[
        {
            "uuid": unit["uuid"],
            "name": unit["name"],
            "symbol": unit["symbol"]
        }
        for unit in units
    ])

# =================================================================================================
# Get all length units
# =================================================================================================
@router.get("/Length")
def length():

    # Get a database session
    with database.session() as database_session:

        # Select all units
        units = database_session.execute(
            "SELECT `units`.`uuid`, `units`.`name`, `units`.`symbol` FROM `units` JOIN `unit_types` ON `units`.`unit_type_id` = `unit_types`.`id` WHERE `unit_types`.`id` = 2;"
        ).fetchall()

    # Return units as JSON
    return JSONResponse(status_code=200, content=[
        {
            "uuid": unit["uuid"],
            "name": unit["name"],
            "symbol": unit["symbol"]
        }
        for unit in units
    ])

# =================================================================================================
# Get unit by its UUID
# =================================================================================================
@router.get("/{unit_uuid}")
def unit(unit_uuid: UUID):

    # Get a database session
    with database.session() as database_session:

        # Select the unit
        unit = database_session.execute(
            "SELECT `units`.`uuid` AS `unit_uuid`, `units`.`name` AS `unit_name`, `units`.`symbol` AS `unit_symbol`, `unit_types`.`uuid` AS `type_uuid`, `unit_types`.`name` AS `type_name` FROM `units` JOIN `unit_types` ON `units`.`unit_type_id` = `unit_types`.`id` WHERE `units`.`uuid` = ?;",
            (str(unit_uuid),)
        ).fetchone()

    # Check no unit was selected
    if unit is None:

        # Return a 404 response
        return JSONResponse(status_code=404, content={"message": "Unit not found!"})

    # If a unit was selected
    else:

        # Return unit as JSON
        return JSONResponse(status_code=200, content={
            "uuid": unit["unit_uuid"],
            "name": unit["unit_name"],
            "symbol": unit["unit_symbol"],
            "type": {
                "uuid": unit["type_uuid"],
                "name": unit["type_name"],
            },
        })