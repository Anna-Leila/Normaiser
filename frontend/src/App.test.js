import { render, screen } from '@testing-library/react'; // import testing tools
import App from './App'; // import App component
import React from "react"; // import React

// test if app renders
test('app renders', () => {
  render(<App />); // render App component
  const startButton = screen.getByText(/start/i); // get start button
  expect(startButton).toBeInTheDocument(); // check if it's in the document
});