import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user123',
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com.br',
      },
      token: 'token123',
    };

    apiMock.onPost('session').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'jonhdoe@example.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', apiResponse.token);
    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(apiResponse.user));
    expect(result.current.user.email).toEqual('jonhdoe@example.com.br');
  });
});