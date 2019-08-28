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

- At the moment, one and the same user objects gets returned (with a username of `"Rexy"` and an `_id` of `"5d5c55121657580017210a68"`)
Currently, the database query for getting the user as part of register is: 
  ```js
  const user = await models.User.findOne().select(['-password']);
  ```
  However, since no params are passed to `findOne()`, it automatically returns the first user object in the collection. Pass in the `userDetails` to get a valid database query.
    - Currently, testing `{"isAdmin": true}` or checking the timestamp generation is impossible since we're getting incorrect return objects from the server.

## `Reset Password`
- The documentation for this endpoint is non-existent. We spent a good half hour trying to figure out how to properly access the endpoint.

- When passing in the same password, it still returns a success message. When passing in the same password as the user had before, it ought to return an error to prevent unnecessary database calls.

## `Create Farmers`
- Should assign the `id` of the staff member to the farmer object not just their username from the decoded token. This requires changing the `staff` key to type `Object`.
- _Why is the `title` key not required for creating a new farmer?_
- `Phone_1` and `Phone_2` are capitalized while all the other properties are lowercase.
- Phone numbers should be of type `String` (`Phone_1`, `Phone_2` & `grt_phone`).
- _Should both `Phone_1` & `Phone_2` be required?_
- `id_number` should be of type `String` as it could include alphabetical characters.
- String `enums` should not be case sentitive. They should all be lowercase. Can use `lowercase: true` in Mongoose schema.
- Should be `number_of_dependents` not `number_of_dependant`.
- _Should `animals_or_birds` be an `enum` or a `Boolean`?_
- `major_source_of_income` & `minor_source_of_income` should accept nested properties `name` and `amount`, instead they require keys of `major_source_of_income.name`, `major_source_of_income.amount`, `minor_source_of_income.name` & `minor_source_of_income.amount`.
- Database currently accepts identical farmer objects. Should return an error?

## Authentication & Token Validation
- `Bearer <token>` is the JWT standard format for passing token on the Authorization Header. Currently the authorization header is set to accept a token in the format `<token>` (without the "Bearer" identifier).