import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../../pages/Settings';

test('Render title', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const title = screen.container.querySelector('#title');
  expect(title).toHaveTextContent('Settings');
  expect(title.nextElementSibling).toHaveTextContent('Make changes to file directories of emails and resumes.');
})

test('Render save changes button', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const saveBtn = screen.container.querySelector('#save-btn');
  expect(saveBtn).toHaveTextContent('SAVE CHANGES');
})

test('Render email directory header', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const emailHeader = screen.container.querySelector('#email-dir-header');
  expect(emailHeader).toHaveTextContent('Email Directory');
})

test('Render resume directory header', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const resumeHeader = screen.container.querySelector('#resume-dir-header');
  expect(resumeHeader).toHaveTextContent('Resume Directory');
})

test('Render internship period header', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const internshipHeader = screen.container.querySelector('#internship-header');
  expect(internshipHeader).toHaveTextContent('Internship Period');
})


// test('Render Title', async () => {
//   // ARRANGE
//   render(<Settings />)

//   // ACT
//   await userEvent.click(screen.getByText('Load Greeting'))
//   await screen.findByRole('heading')

//   // ASSERT
//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toBeDisabled()
// })