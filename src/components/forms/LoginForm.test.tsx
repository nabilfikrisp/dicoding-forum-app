import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { type ReactNode } from 'react';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

const renderComponent = (component: ReactNode) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={component} />
        </Routes>
      </BrowserRouter>
    </Provider>,
  );
};

describe('Login Form Component', () => {
  const mockLoginFn = vi.fn();
  beforeEach(() => {
    renderComponent(<LoginForm login={mockLoginFn} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    const emailInput = screen.getByPlaceholderText('johndoe@gmail.com');
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    // @ts-expect-error HTML Assertion is extended from jest macther
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    const passwordInput = screen.getByPlaceholderText('Your secret code...');
    await userEvent.type(passwordInput, '123456');

    // @ts-expect-error HTML Assertion is extended from jest macther
    expect(passwordInput).toHaveValue('123456');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const emailInput = screen.getByPlaceholderText('johndoe@gmail.com');
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    const passwordInput = screen.getByPlaceholderText('Your secret code...');
    await userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(loginButton);

    expect(mockLoginFn).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: '123456',
    });
  });
});
