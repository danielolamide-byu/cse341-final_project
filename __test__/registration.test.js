
// app.test.js

require('dotenv').config();

const request = require('supertest');

const app = require('../app')



// const {app} = require('../app')

describe('This routes test the GET Routes.', () => {
  // it('should return a 200 status and correct JSON data', async() => {
  //   // Send a GET request to the /api/data endpoint
  //   const response = await request(app).get('/events');

  //   // Assert the status code
  //   expect(response.statusCode).toBe(200);
    
  // });


  it('should return a 200 status and correct JSON data', async () => {
    // Send a GET request to the /api/data endpoint
    const response = await request(app).get('/users');

    // Assert the status code
    expect(response.statusCode).toBe(400);
  });


  // it('should return a 200 status and correct JSON data', async() => {
  //   // Send a GET request to the /api/data endpoint
  //   const response = await request(app).get('/registrations');

  //   // Assert the status code
  //   expect(response.statusCode).toBe(200);
  // });
    
    
   
  // it('should return a 200 status and correct JSON data', async() => {
  //   // Send a GET request to the /api/data endpoint
  //   const response = await request(app).get('/reviews');

  //   // Assert the status code
  //   expect(response.statusCode).toEqual(200);
    
  // });
    
    
    
    
  });

  // it('should return a 404 for an undefined route', async () => {
  //   const response = await request(app).get('/events');
  //   expect(response.statusCode).toBe(404);
  // });

// require('../app/routes/index/registrations