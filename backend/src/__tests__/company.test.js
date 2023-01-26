const supertest = require('supertest');
const app = require("../server");
const request = supertest(app);
const fs = require('fs');
const path = require('path');

describe('Company API tests', () => {
    // test('tests get /companies endpoints', async() => {
    //     const response = await request.get("/api/v1/companies");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toHaveLength(4);
    // });
    
    test('Post /compaines', async() => {
        const file = fs.createReadStream(path.join(__dirname ,'../../..', "TestData/gaf.csv"));
        request
          .post("http://localhost:5222/api/v1/companies/upload")
          .attach("company", file)
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.message).toBe("File uploaded successfully");
            done();
          });
    })
});