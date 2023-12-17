import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { type ReactNode } from 'react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

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

describe('Register Form Component', () => {
  const mockRegisterFn = vi.fn();
  beforeEach(() => {
    renderComponent(<RegisterForm register={mockRegisterFn} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    const nameInput = screen.getByPlaceholderText('John Doe');
    await userEvent.type(nameInput, 'name test');

    // @ts-expect-error HTML Assertion is extended from jest macther
    expect(nameInput).toHaveValue('name test');
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

  it('should call register function when register button is clicked', async () => {
    const nameInput = screen.getByPlaceholderText('John Doe');
    await userEvent.type(nameInput, 'name test');

    const emailInput = screen.getByPlaceholderText('johndoe@gmail.com');
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    const passwordInput = screen.getByPlaceholderText('Your secret code...');
    await userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(loginButton);

    expect(mockRegisterFn).toBeCalledWith({
      name: 'name test',
      email: 'emailtest@gmail.com',
      password: '123456',
    });
  });
});
