import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadData from '../../pages/UploadData';

test('Render title', async () => {
  // ARRANGE
  const screen = render(<UploadData />);

  // ASSERT
  const title = screen.container.querySelector('#title');
  expect(title).toHaveTextContent('Upload Data');
  expect(title.nextElementSibling).toHaveTextContent('Upload the corresponding excel files for the current semester here.');
})

test('Render internship period header', async () => {
  // ARRANGE
  const screen = render(<UploadData />);

  // ASSERT
  const internshipHeader = screen.container.querySelector('#internship-header');
  expect(internshipHeader).toBeInTheDocument();
})

test('Render student data header', async () => {
  // ARRANGE
  const screen = render(<UploadData />);

  // ASSERT
  const studentDataHeader = screen.container.querySelector('#student-file-header');
  expect(studentDataHeader).toHaveTextContent("Student's Data");
})

test('Render company data header', async () => {
  // ARRANGE
  const screen = render(<UploadData />);

  // ASSERT
  const companyDataHeader = screen.container.querySelector('#company-file-header');
  expect(companyDataHeader).toHaveTextContent("Company's Data");
})

test('Render file directory fields', async () => {
  // ARRANGE
  const screen = render(<UploadData />);

  // ASSERT
  const fileDirectoryFields = screen.getAllByText('File Directory')
  expect(fileDirectoryFields.length).toBe(2)
})

test('Render upload file buttons', async () => {
  // ARRANGE
  const screen = render(<UploadData />);

  // ASSERT
  const uploadFileButtons = screen.getAllByText('UPLOAD FILE')
  expect(uploadFileButtons.length).toBe(2)
})

//TODO:: Functional tests