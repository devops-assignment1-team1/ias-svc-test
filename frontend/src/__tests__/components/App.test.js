import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../../App';

test('Render footer', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter> initialEntries={['/Main']}
    <App />
  </MemoryRouter>);

  // ASSERT
  const footer = screen.container.querySelector('#footer');
  expect(footer).toHaveTextContent('IAS 2023');
});


test('Render navbar', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter> initialEntries={['/Main']}
    <App />
  </MemoryRouter>);

  // ASSERT
  const navBarLogo = screen.container.querySelector('.navbar-brand');
  expect(navBarLogo).toHaveTextContent("IAS");
  const navLinks = screen.container.querySelector('.navbar-nav');
  expect(navLinks.childElementCount).toEqual(4);
  expect(navLinks).toHaveTextContent("UPLOAD MATCH STUDENTS PREPARE EMAILS SETTINGS");
});