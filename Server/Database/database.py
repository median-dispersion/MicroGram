from pathlib import Path
from contextlib import contextmanager
import sqlite3

# Relative file path
PATH = Path(__file__).parent

# Database schema script path
SCHEMA = PATH / "schema.sql"

# Database data script path
DATA = PATH / "data.sql"

# Database path
DATABASE = PATH / "Data/MicroGram.db"

# =================================================================================================
# Database connection manager
# =================================================================================================
@contextmanager
def connection():

    # Connect to the database
    con = sqlite3.connect(DATABASE)

    try:

        # Make rows behave like dictionaries
        con.row_factory = sqlite3.Row

        # Enforce foreign key constraints
        con.execute("PRAGMA foreign_keys = ON;")

        # Yield the database connection
        yield con

        # Commit changes
        con.commit()

    except Exception as exception:

        # Rollback changes
        con.rollback()

        # Reraise the exception
        raise exception

    finally:

        # Close the database connection
        con.close()

# =================================================================================================
# Database cursor manager
# =================================================================================================
@contextmanager
def cursor(con):

    # Create a database cursor
    cur = con.cursor()

    try:

        # Yield the cursor
        yield cur

    finally:

        # Close the cursor
        cur.close()

# =================================================================================================
# Database session manager
# =================================================================================================
@contextmanager
def session():

    # Connect to the database and get a cursor
    with connection() as con:
        with cursor(con) as cur:

            # Yield the cursor
            yield cur

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

    # Start a database session
    with session() as ses:

        # Execute the schema and data scripts
        ses.executescript(schema)
        ses.executescript(data)