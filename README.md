# API Documentation

**You can view the deployed (Heroku) backend here:**

**[Production Deployment](https://tieme-ndo-backend-production.herokuapp.com/)**
**[Staging Deployment 1](https://tieme-ndo-backend-staging1.herokuapp.com/)**
**[Staging Deployment 2](https://tieme-ndo-backend-staging2.herokuapp.com/)**


## Getting started

To get this project up and running locally:

1. Clone this repo
1. Run `npm install` to install all of the required dependencies.
1. Install **MongoDB Community Edition** on you local machine. Instructions can be found [here](https://docs.mongodb.com/manual/installation/).
1. Create a db called `tiemendo` & `tiemendo_test`
```bash
> use tiemendo
> db.testCollection.insertOne({ x: 1 });
```
```bash
> use tiemendo_test
> db.testCollection.insertOne({ x: 1 });
```
5. Create a `.env` file in the root of the project with the following environment variables:
```
DB_CONNECTION=mongodb://localhost:27017/tiemendo
DB_CONNECTION_TEST=mongodb://localhost:27017/tiemendo_test
JWT_SECRET=<generated string>
```
- You can generate a token secret using python:
	```python
	>>> import random
	>>> ''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)])
	```

6. `npm run dev` to start the local server
7. `npm test` to start server using testing environment

## Backend Frameworks

**Our rationale in choosing the frameworks we used:**

### Express
- We agreed to use Express as it is a familiar web server framework to what we knew that is extremely easy to use.
- It is modular and has great authentication, cookies, and sessions libraries.

### NodeJS
- Excellent third-party library support through NPM
- It has a large and robust open-source community and great support on Stack Overflow and other platforms for trouble-shooting.

### MongoDB
- Would give greater exposure to the NoSQL database paradigm - perfectly complementing our SQL background during our Lambda School curriculum. 
- Greater freedom in schema design during prototyping and ideation. Also a greater familiarity with JSON-like object
- Greater scalability with sharding and load-balancing with future product cycles and user growth.
- First-party, pre-installed servers available for free through MongoDB.


## Endpoints

#### User Routes

**All routes expect login route will need token in Authorization header**

| Method | Endpoint                 | Access Control | Description                                 | Token in Authorization header |
| ------ | ------------------------ | -------------- | ------------------------------------------- | ----------------------------- |
| POST   | `/api/v1/user/signup`    | admin          | Create a new user account (staff and admin) | True                          |
| POST   | `/api/v1/user/login`     | admin && staff | Login user (staff and admin)                | False                         |
| POST   | `/api/v1/farmers/create` | admin && staff | Create new farmer                           | True                          |

# Data Model

#### Organizations

```js
{
  _id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### Users

Create new user account (Staff)

```js
{
  _id: UUID
  username: STRING,
  password: STRING
}
```

Create new user account (Admin)

```js
{
  _id: UUID
  username: STRING,
  password: STRING,
  isAdmin: BOOLEAN
}
```

Login user (Admin && Staff)

```js
{
 username: STRING,
 password: STRING,
}
```

Create new farmer

```js
{
	personalInfo: {
  title: STRING,
	surname: STRING,
	first_name: STRING,
	middle_name: STRING,
	marital_status: STRING,
	gender: STRING,
	place_of_birth: STRING,
	date_of_birth: DATE,
	id_type: STRING,
	id_number: NUMBER,
	district: STRING,
	region: Kumasi STRING,
	community_name: STRING,
	house_name: STRING,
	house_number: NUMBER,
	nearest_landmark: STRING,
	Phone_1: NUMBER,
	Phone_2: NUMBER,
	education_level: STRING,
	occupation: STRING,
	expected_income_per_month: STRING,
	major_source_of_income.name: STRING,
	major_source_of_income.amount: NUMBER,
  minor_source_of_income.name: STRING,
	minor_source_of_income.amount: NUMBER
  },
	familyInfo: {
			family_size: NUMBER,
		number_of_dependant: NUIMBER,
		highest_level_of_dependent: STRING,
		family_income_per_month: STRING
	},
	guarantor:{
		grt_title: STRING,
		grt_surname: STRING,
		grt_first_name: STRING,
		grt_gender: STRING,
		grt_relations: STRING,
		grt_residential_address: STRING,
		grt_occupation: STRING,
		grt_phone: NUMBER,
		grt_district: STRING,
		grt_region: STRING
    },
		farmInfo:{
		number_of_acres: NUMBER,
		location_of_farm: STRING,
		farm_nearest_landmark: STRING,
			crops_cultivated: ARRAY,
			animals_or_birds: ARRAY
		}
}
```

## Actions
[db actions]

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

Create a `.env` file that includes the following:

- **DB_CONNECTION** - for MongoDB connection string for production or development
- **DB_CONNECTION_TEST** - for MongoDB connection string for testing
* **NODE_ENV** - set to "development" until ready for "production"

- **JWT_SECRET** - you can generate this by using a python shell and running:
```python
import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)])
```

_You can also check [.env.example](./.env.example) to know all required environment variables._

## Contributing

[Instructions]

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/tieme-ndo/frontend/blob/master/README.md) for details on the fronend of our project.
