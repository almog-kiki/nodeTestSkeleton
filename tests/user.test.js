
const app = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose');
const UserModel = require('../models/user.model')

let db;
beforeAll(async() => {
  process.env.NODE_ENV = 'test';
  const mongodbUrl = process.env.MONGODB_URL + process.env.MONGODB_NAME
  const mongoDB = mongodbUrl || 'mongodb://127.0.0.1/DB_NAME';

  await mongoose.connect(mongoDB, { useNewUrlParser: true , useCreateIndex: true,useFindAndModify: false});
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('disconnected', function() {
    console.log('mongo db connection closed');
    }
  );

})

test('get all users', async done => {
      const response = await request.get('/user/find');
      const users = await UserModel.find();
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(users.length);
      done()
});

test('get github users', async done => {
  const username= "almog";
  const response = await request.get(`/user/getGithubUser/${username}`);
  expect(response.status).toBe(200);
  expect(response.body.login).toEqual(username);
  done()
});


afterAll(async () => {
  console.log("after all - close db")
  db.close()
});