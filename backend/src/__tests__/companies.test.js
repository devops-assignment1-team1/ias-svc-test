const fetchMock = require('fetch-mock')

fetchMock.get('/api/v1/companies', [{ id: 1, name: "Company A", job_role: "Software Developer", contact: "Mr A", email: "A@email.com" },
{ id: 2, name: "Company B", job_role: "Software QA", contact: "Ms B", email: "B@email.com" },
{ id: 3, name: "Company C", job_role: "Intern", contact: "Mdm C", email: "C@email.com" },
{ id: 4, name: "Company D", job_role: "Documentation Team", contact: "Dr D", email: "D@email.com" }
])

test('API returns a list of companies', async () => {
    // test API
    const response = await fetch('/api/v1/companies');
    const companies = await response.json();
    expect(companies).toEqual([{ id: 1, name: "Company A", job_role: "Software Developer", contact: "Mr A", email: "A@email.com" },
    { id: 2, name: "Company B", job_role: "Software QA", contact: "Ms B", email: "B@email.com" },
    { id: 3, name: "Company C", job_role: "Intern", contact: "Mdm C", email: "C@email.com" },
    { id: 4, name: "Company D", job_role: "Documentation Team", contact: "Dr D", email: "D@email.com" }]);
});

fetchMock.reset()

// test for upload company data
// TODO

// Set up the mock API to return an error
fetchMock.get('/api/v1/companies', 500);

// Test the API error handling
test('API handles errors correctly', async () => {
  try {
    await fetch('/api/v1/companies');
  } catch (error) {
    expect(error.message).toEqual('Internal Server Error');
  }
});

// Reset the mock API
fetchMock.reset();

