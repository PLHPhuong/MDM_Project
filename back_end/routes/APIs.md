http://localhost:8000/api/activities
/api/actdetail
api/purchaseticket
/api/acttraction
/api/user


- GET http://localhost:8000/api/user: get user's profile
- POST http://localhost:8000/api/user/login: login user
- POST http://localhost:8000/api/user/register : register account

- GET http://localhost:8000/api/acttraction/:id : get an acttraction information by id
- POST http://localhost:8000/api/acttraction/ : create an acttraction information
- GET http://localhost:8000/api/acttraction/:id: update an acttraction information by id
  
- GET http://localhost:8000/api/activities/continent/city: get all cities group by continent in activities
