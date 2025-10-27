from pathlib import Path
from contextlib import contextmanager
import sqlite3

# Relative file path
PATH = Path(__file__).parent

# Database schema path
SCHEMA = PATH / "schema.sql"

# Database data path
DATA = PATH / "data.sql"

# Database path
DATABASE = PATH / "Data/MicroGram.db"

# =================================================================================================
# Database connection manager
# =================================================================================================
@contextmanager
def connection():

    # Connect to the database
    database_connection = sqlite3.connect(DATABASE)

    try:

        # Make rows behave like dictionaries
        database_connection.row_factory = sqlite3.Row

        # Enforce foreign key constraints
        database_connection.execute("PRAGMA foreign_keys = ON;")

        # Yield the database connection
        yield database_connection

        # Commit changes
        database_connection.commit()

    except Exception as exception:

        # Rollback changes
        database_connection.rollback()

        # Reraise the exception
        raise exception

    finally:

        # Close the database connection
        database_connection.close()

# =================================================================================================
# Database cursor manager
# =================================================================================================
@contextmanager
def cursor(database_connection):

    # Create a database cursor
    database_cursor = database_connection.cursor()

    try:

        # Yield the cursor
        yield database_cursor

    finally:

        # Close the cursor
        database_cursor.close()

# =================================================================================================
# Database session manager
# =================================================================================================
@contextmanager
def session():

    # Get a database connection and cursor
    with connection() as database_connection:
        with cursor(database_connection) as database_cursor:

            # Yield the cursor
            yield database_cursor

# =================================================================================================
# Initialize the database
# =================================================================================================
def initialize():

    # Create database directory
    DATABASE.parent.mkdir(parents=True, exist_ok=True)

    # Get the database schema
    with open(SCHEMA, "r") as file:
        schema = file.read()

    # Get the database data
    with open(DATA, "r") as file:
        data = file.read()

    # Get a database session
    with session() as database_session:

        # Execute the schema and data scripts
        database_session.executescript(schema)
        database_session.executescript(data)