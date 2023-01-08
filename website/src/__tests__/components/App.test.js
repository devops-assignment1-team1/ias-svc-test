import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

test('Render footer', async () => {
  // ARRANGE
  const screen = render(<App />);

  // ASSERT
  const footer = screen.container.querySelector('#footer');
  expect(footer).toHaveTextContent('IAS 2023');
})


test('Render navbar', async () => {
  // ARRANGE
  const screen = render(<App />);

  // ASSERT
  const navLinks = screen.container.querySelector('.navbar-nav').childElementCount;
  expect(navLinks).toEqual(4);
})

// test('Upload navbar routing', async () => {
//   // ARRANGE
//   const screen = render(<App />)

//   // ACT
//   await userEvent.click(screen.getByText('UPLOAD'))

//   // ASSERT
//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toBeDisabled()
// })