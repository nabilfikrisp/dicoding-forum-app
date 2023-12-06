import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './components/RootLayout';
import LoadingState from './components/LoadingState';
import ErrorPage from './routes/ErrorPage';
import Thread from './routes/Thread';
import AuthRoute from './components/middlewares/AuthRoute';
import NotAuthRoute from './components/middlewares/NotAuthRoute';
import { Toaster } from './components/ui/toaster';

const Login = lazy(() => import('./routes/Login'));
const ThreadDetail = lazy(() => import('./routes/ThreadDetail'));
const NewThread = lazy(() => import('./routes/NewThread'));
const Register = lazy(() => import('./routes/Register'));
const LeaderBoard = lazy(() => import('./routes/LeaderBoard'));

const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: '/',
            element: <Thread />,
          },
          {
            path: '/threads/:id',
            element: (
              <Suspense fallback={<LoadingState />}>
                <ThreadDetail />
              </Suspense>
            ),
          },
          {
            path: '/new',
            element: (
              <Suspense fallback={<LoadingState />}>
                <NewThread />
              </Suspense>
            ),
          },
          {
            path: '/leaderboards',
            element: (
              <Suspense fallback={<LoadingState />}>
                <LeaderBoard />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <NotAuthRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingState />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<LoadingState />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
