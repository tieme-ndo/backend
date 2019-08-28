🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by. Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric. Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **npm install** to install all required dependencies
- **npm run dev** to start the local server
- **npm test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

- Point One
- Point Two
- Point Three
- Point Four

## 2️⃣ Endpoints

#### User Routes

**All routes expect login route will need token in Authorization header**

| Method | Endpoint                 | Access Control | Description                                 | Token in Authorization header |
| ------ | ------------------------ | -------------- | ------------------------------------------- | ----------------------------- |
| POST   | `/api/v1/user/signup`    | admin          | Create a new user account (staff and admin) | True                          |
| POST   | `/api/v1/user/login`     | admin && staff | Login user (staff and admin)                | False                         |
| POST   | `/api/v1/farmers/create` | admin && staff | Create new farmer                           | True                          |
| PUT    | `/api/v1/farmers/:id/update` | admin && staff | Update farmer details                       | True                          |

| GET    | `/api/v1/farmers` 				| admin && staff | Get All Farmers	                           | True                          |
| GET    | `/api/v1/farmers/:id`			 				| admin && staff | Get Farmer By Id	                           | True                          |


# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

Create new user account (Staff)

```
{
  id: UUID
 username: STRING,
 password: STRING
}
```

Create new user account (Admin)

```
{
  id: UUID
 username: STRING,
 password: STRING,
 isAdmin: BOOLEAN
}
```

Login user (Admin && Staff)

```
{
 username: STRING,
 password: STRING,
}
```

Create new farmer

```
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

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

_ DB_CONNECTION - for MongoDB connection string for production or development
_ DB\*CONNECTION_TEST - for MongoDB connection string for testing

- NODE\*ENV - set to "development" until ready for "production"

* JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)])
  _ SENDGRID_API_KEY - this is generated in your Sendgrid account \* stripe_secret - this is generated in the Stripe dashboard.

_You can also check .env.example to know all environment variables_

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

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

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
