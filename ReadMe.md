# Scheduling App Code Challenge
This application was created as part of a code challenge. It is a complete frontend, backend, and database application that allows a users and administrators to view and 
manage a shift schedule. Users can log in to view their own shift schedule and edit/delete their own shifts. 
Administrators can log in to view the full shift schedule, edit user shifts, and delete shifts.

The frontend is written in React which was the quickest for my to create. [Read More about why I chose React](#front-end)

The back end will be written in Express, utilizing Mongoose as an ODM. [Read More about why I chose Express](#back-end)

The database will be MongoDB. [Read More about why I chose MongoDB](#database)

## Requirements
- Node (10.16.0)
- MongoDB (4.0.10)
    - Must be able to connect locally on port 27017 without username/password, otherwise credentials will need to be added to `config/default.json`

### Optional
- `concurrently` and `nodemon` installed globally (`npm install -g concurrently nodemon`)
    - **Note:** The server runs in nodemon for hot-loading, and concurrently will run both environments 
    locally on the 3000 (front) and 5000 (back) ports. If these are not installed locally, you'll want to 
    run `node server` on Step 4 of installation below to start the back end, and open up another terminal and 
    run `npm start --prefix client`

## Installation
1. Clone this repository
1. Run `npm install` in both the project directory and the `client` folder to install `node_modules`
1. Run `npm run seed` to seed the `user` and `role` documents. Demo credentials listed [here](#credentials)
1. Run `npm run dev` to start the application. It will automatically open a http://localhost:3000 for the 
    front end, and http://localhost:5000 for the back end.
    - **Note:** If you do not have `concurrently` and `nodemon` installed globally, you'll want to run `node server` to start the back end and open up another terminal and run `npm start --prefix client`

You can now log in using the credentials below.

### Credentials <a name="credentials"></a>
- Admin: `admin@schedulingapp.com/admin1234`
- User: `user@schedulingapp.com/user1234`

## API Documentation
Most calls exist under an authentication layer. You must first log in a user to obtain a JWT to make the other calls. 

### Login User
**Description:** Generates a JWT token for the user, logging them in and allowing them to access private routes and private api

**Method:** `POST`

**URL:** `http:localhost:5000/api/auth`

**Body:** `{email, password}`

### Register User
**Description:** Registers a new user with the application.

**Method:** `POST`

**URL:** `/api/users`

**Body:** `{email, password}`

### List All Shifts
**Description:** View a list of all shifts. This call uses the logged in JWT token to pull only the user specific shifts, if user is role admin, it pulls all records.

**Method:** `GET`

**URL:** `/api/shifts/`

**Auth:** `user`, `admin`

### List Shift by Id
**Description:** Gets a shift by its id.
**Method:** `GET`

**URL:** `/api/shifts/{id}`

**Auth:** `user`, `admin`

### List Shifts by Date Range
**Description:** View a list of all shifts. This call uses the logged in JWT token to pull only the user specific shifts, if user is role admin, it pulls all records.

**Method:** `GET`

**URL:** `/api/shifts/{startDate}/{endDate}`

**Auth:** `user`, `admin`

### Create/Update a Shift
**Description:** Create a new shift under the logged in user or edit an existing shift. Admins can edit user shifts.

**Method:** `POST`

**URL:** `/api/shifts`

**Body:** `{email?, id?, from, to}`

**Auth:** `user`, `admin`

### Delete a Shift
**Description:** Deletes a shift

**Method:** `DELETE`

**URL:** `/api/shifts/{id}`

**Auth:** `user`, `admin`

## Why did I choose what I chose?
### Front End <a name="front-end"></a>
I chose React for the front end as that is what I have the most experience in, and was the quickest to build out.

### Back End <a name="back-end"></a>
I chose Express for the back end. This was against something I would be quick in, as well as keeping the application
simple to run under two node processes running on different ports.

### Database <a name="database"></a>
I chose MongoDB as it ties in well with Express and Mongoose node module and I know it well.