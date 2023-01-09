const fetchMock = require('fetch-mock')

const companies = [{ company_id: 1, company_name: "Company A", job_role: "Software Developer", company_contact: "Mr A", email: "A@email.com" },
{ company_id: 2, company_name: "Company B", job_role: "Software QA", company_contact: "Ms B", email: "B@email.com" },
{ company_id: 3, company_name: "Company C", job_role: "Intern", company_contact: "Mdm C", email: "C@email.com" },
{ company_id: 4, company_name: "Company D", job_role: "Documentation Team", company_contact: "Dr D", email: "D@email.com" }]

fetchMock.get('/api/v1/companies', {
  status: 404,
  body: { error: 'Not Found' },
  headers: { 'Content-Type': 'application/json'}
}, 
{   
  fallback: {
    status: 200,
    body: companies,
    headers: { 'Content-Type': 'application/json'}
  }
})

// test return list of companies
test('API returns a list of companies', async () => {
    // test API
    const response = await fetch('/api/v1/companies')
    const data = await response.json();
    expect(data).toEqual(companies);
});

fetchMock.reset()

// test for upload company data
// TODO

// setup mock API to return error
fetchMock.get('/api/v1/companies', 500)

// test error handling
test('API handles errors correctly', async () => {
  try {
    await fetch('/api/v1/companies')
  } catch (error) {
    expect(error.message).toEqual('Internal Server Error')
  }
});

fetchMock.reset();

