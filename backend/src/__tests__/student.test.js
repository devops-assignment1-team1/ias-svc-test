const request = require('supertest');
const app = require("../routes/student");

describe('student test suite', () => {
    test('tests /student endpoints', async() => {
        const response = await request(app).get("/");
        expect(response.body).toHaveLength(7);
        expect(response.statusCode).toBe(200);
    });

    // Insert other tests below this line

    // Insert other tests above this line
});