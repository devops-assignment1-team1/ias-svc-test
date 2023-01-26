const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);
const fs = require('fs');
const path = require('path');

describe('student test suite', () => {
    test('tests get /students endpoints', async() => {
        const response = await request.get("/api/v1/students");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(10);
    });
    test('Post /students', async() => {
        const file = fs.createReadStream(path.join(__dirname ,'..', "/routes/student/internshipData/12/12/2022-12/1/2023/gaf.csv"));
        request
          .post("http://localhost:5222/api/v1/students/upload")
          .attach("student", file)
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.message).toBe("File uploaded successfully");
            done();
          });
    })
});