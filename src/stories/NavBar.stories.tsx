import NavBar from '@/components/NavBar';
import { type TAuthState } from '@/interfaces/auth.interface';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

const notLoggedInState = {
  token: null,
  loading: false,
  message: null,
  error: null,
  myProfile: null,
  isLoggedIn: false,
};

const loggedInState: TAuthState = {
  token: 'random',
  loading: false,
  message: null,
  error: null,
  myProfile: null,
  isLoggedIn: true,
};

const MockStore = ({
  state,
  children,
}: {
  state: TAuthState;
  children: ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        auth: createSlice({
          name: 'auth',
          initialState: state,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  decorators: [
    withRouter,
    (story) => (
      <div className="flex w-[98vw] flex-col items-center justify-center overflow-x-hidden pb-[60px]">
        {story()}
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  excludeStories: ['notLoggedInState', 'loggedInState'],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedIn: Story = {
  decorators: [
    (story) => <MockStore state={notLoggedInState}>{story()}</MockStore>,
  ],
};

export const IsLoggedIn: Story = {
  decorators: [
    (story) => <MockStore state={loggedInState}>{story()}</MockStore>,
  ],
};

export const ActiveNav: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/leaderboards',
      },
    }),
  },
  decorators: [
    (story) => <MockStore state={loggedInState}>{story()}</MockStore>,
  ],
};
