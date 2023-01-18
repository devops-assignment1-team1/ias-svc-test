const request = require('supertest');
const app = require("../routes/company/GET");

describe('Company API tests', () => {
    test('GET /companies', async() => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(4);
    });
    
    // test('POST /companies', async() => {
    //     const payload = {''};
    //     const res = await request
    //                 .post('/api/v1/companies/upload')
    //                 .send(payload)
    //                 .set('Content-Type', 'multipart/form-data')
    //                 .set('Accept', 'multipart/form-data')

    //     expect(res.statusCode).toBe(200);
    // });
});