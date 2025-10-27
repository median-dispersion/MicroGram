from argon2 import PasswordHasher

# Password hasher
hasher = PasswordHasher()

# =================================================================================================
# Hash a password
# =================================================================================================
def hash(password: str):

    # Return the hashed password
    return hasher.hash(password)

# =================================================================================================
# Validation check
# =================================================================================================
def valid(password: str, hashed_password: str):

    # Try validating the password against the hash
    try:

        # Return true if the match
        return hasher.verify(hashed_password, password)

    # If password could not be validated
    except Exception:

        # Return false
        return False

# =================================================================================================
# Obsolete check
# =================================================================================================
def obsolete(hashed_password: str):

    # Return if the hash is obsolete and needs rehashing
    return hasher.check_needs_rehash(hashed_password)