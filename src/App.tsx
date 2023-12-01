import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './components/RootLayout';
import LoadingState from './components/LoadingState';
import ErrorPage from './routes/ErrorPage';
import Thread from './routes/Thread';
import AuthRoute from './components/middlewares/AuthRoute';
import Register from './routes/Register';
import NotAuthRoute from './components/middlewares/NotAuthRoute';
import { Toaster } from './components/ui/toaster';
import ThreadDetail from './routes/ThreadDetail';
import NewThread from './routes/NewThread';

const Login = lazy(() => import('./routes/Login'));

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
