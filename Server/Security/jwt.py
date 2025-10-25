import secrets
import string
from datetime import datetime, timedelta, timezone
import jwt

# JWT key, will be generated every time the server restart logging out all users
KEY = "".join(secrets.choice(string.ascii_letters + string.digits + string.punctuation) for i in range(128))

# JWT algorithm
ALGORITHM = "HS256"

# JWT expiration, 604800 seconds = 7 days
EXPIRATION_SECONDS = 604800

# =================================================================================================
# Encode
# =================================================================================================
def encode(userID: int):

    # Construct payload
    payload = {

        "sub": userID,
        "exp": datetime.now(tz=timezone.utc) + timedelta(seconds=EXPIRATION_SECONDS)

    }

    # Encode and return the payload as a JWT
    return jwt.encode(payload, KEY, algorithm=ALGORITHM)

# =================================================================================================
# Decode
# =================================================================================================
def decode(token: str):

    # Try decoding the JWT
    try:

        # Return the decoded user ID
        return jwt.decode(token, KEY, algorithms=[ALGORITHM]).get("sub")

    # If an exception occurs, for example invalid or expired token
    except Exception:

        # Return no payload
        return None