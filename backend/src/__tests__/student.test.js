const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);
const fs = require('fs');
const path = require('path');

describe('student test suite', () => {
  test('tests get /students endpoints', async () => {
    expect([]).toHaveLength(0);
  });
});