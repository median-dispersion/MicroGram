from argon2 import PasswordHasher

# Password hasher
hasher = PasswordHasher()

# =================================================================================================
# Hash
# =================================================================================================
def hash(pwd: str):

    # Return the hashed password
    return hasher.hash(pwd)

# =================================================================================================
# Validation check
# =================================================================================================
def valid(pwd: str, hsh: str):

    # Try validating the password against the hash
    try:

        # Return true if the match
        return hasher.verify(hsh, pwd)

    # If password could not be validated
    except Exception:

        # Return false
        return False

# =================================================================================================
# Obsolete check
# =================================================================================================
def obsolete(hsh: str):

    # Return if the hash is obsolete and needs rehashing
    return hasher.check_needs_rehash(hsh)