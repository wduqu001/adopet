// @ts-nocheck

import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

jest.mock('axios');

test('renders pet search layout', () => {
  const { getByText, getAllByRole } = render(<App />);
  const header = getByText(/Pet Search/i);
  const settings = getAllByRole(/menuitem/i);

  expect(header).toBeInTheDocument();
  expect(settings.length).toEqual(6);
});

test('adds api_key to localStorage', () => {
    localStorage.clear();

    expect(localStorage.length).toBe(0);
    
    localStorage.setItem("api_key", "TEST");

    expect(localStorage.length).toEqual(1);
    expect(localStorage.getItem("api_key")).toEqual("TEST");
});
