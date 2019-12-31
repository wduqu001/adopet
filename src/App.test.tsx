import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Axios from 'axios';
import { API_BASE_URL, SESSION_REQUEST } from './config';
import { requestSession } from './authentication.helper';

jest.mock('axios');

test('renders pet search title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Pet Search/i);
  expect(linkElement).toBeInTheDocument();
});
