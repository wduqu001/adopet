// @ts-nocheck

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

test('adds api_key to localStorage', () => {
    localStorage.clear();

    expect(localStorage.length).toBe(0);
    
    localStorage.setItem("api_key", "TEST");

    expect(localStorage.length).toEqual(1);
    expect(localStorage.getItem("api_key")).toEqual("TEST");
});
 
