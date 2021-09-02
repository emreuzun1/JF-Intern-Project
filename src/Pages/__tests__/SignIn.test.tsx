import React from 'react';
import {fireEvent, render, waitFor} from '../__mocks__/testUtils';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import Login from '../Login';
import axios from 'axios';
import {requestLogin} from '../../Lib/api';

describe('login correctly', () => {
  test('renders correctly', async () => {
    const mockedParams = {
      route: {params: {isLogged: false}},
      navigation: {
        navigate: jest.fn(),
      },
    };
    const {getByPlaceholderText, getByText} = render(
      <Login {...(mockedParams as any)} />,
    );
    /* const usernameInput = getByPlaceholderText(' Username');
    const passwordInput = getByPlaceholderText(' Password');
    const button = getByText('Login');
    await waitFor(() => {
      try {
        fireEvent.changeText(usernameInput, 'emreuzun1');
        fireEvent.changeText(passwordInput, 'w8h2h4');
        fireEvent.press(button);
        expect(mockedParams.navigation.navigate).toHaveBeenCalled();
      } catch (err) {}
    }); */
  });
  test('logged in', async () => {
    var mock = new MockAdapter(axios);
    const data = {responseCode: 200};
    mock
      .onGet('https://api.jotform.com/user/login', {
        username: 'emreuzun1',
        password: 'w8h2h4lv',
      })
      .reply(200, data);

    requestLogin('emreuzun1', 'w8h2h4lv').then(response => {
      console.log('Here');
      expect(response).toEqual(data);
    });
  });
});
