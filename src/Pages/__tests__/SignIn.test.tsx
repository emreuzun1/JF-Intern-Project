import React from 'react';
import {fireEvent, render, waitFor} from '../__mocks__/testUtils';
import Login from '../Login';

test('renders correctly', async () => {
  const mockedParams = {
    route: {params: {isLogged: false}},
    navigation: '',
  };
  const screen = render(<Login {...mockedParams} />);
  const usernameInput = screen.getByPlaceholderText(' Username');
  fireEvent.changeText(usernameInput, 'emreuzun1');
  const passwordInput = screen.getByPlaceholderText(' Password');
  fireEvent.changeText(passwordInput, 'w8h2h4lvjj.');
  const loginButton = screen.getByText('Login');
  fireEvent.press(loginButton);
});
