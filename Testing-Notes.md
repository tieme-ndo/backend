# Testing Notes

## `/login`
- `"username"` should not be case sensitive. It should be normalised before it is added to the db. <br>
**Example**: passing `{"username": "Pavol"}` should be normalised to `{"username": "pavol"}`.

- `"username"` should not take non-alphabetical characters and return an error straight away. Caveat: there is something to be said for allowing numerical characters in the username, but this should be done after careful deliberation <br>
**Example**: passing `{"username": "Pavol."}` currently returns `User does not exist`

## `/signup`
- As with Login, `"username"` should not take non-alphabetical characters and return an error straight away. Caveat: there is something to be said for allowing numerical characters in the username, but this should be done after careful deliberation <br>
**Example**: passing `{"username": "Pavol."}` currently gets accepted just fine.
**Example**: passsing `{"username": "..."}`, also works at the moment.

- Passing `{"isAdmin": true}` has no effect on the return value, which resolves to `{"isAdmin": false}`. This could be part of mock return objects, though

## `Reset Password`


## `Create Farmers`

## Authentication & Token Validation
- `Bearer <token>` is the JWT standard format for passing token on the Authorization Header. Currently the authorization header is set to accept a token in the format `<token>` (without the "Bearer" identifier).