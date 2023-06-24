import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home, HomeLoader } from './pages/home/Home';
import { Login, LoginLoader } from './pages/login/Login';
import { Verify, VerifyLoader } from './pages/verify/Verify';
import { Settings, SettingsLoader } from './pages/settings/Settings';
import MultiplePreferences from './pages/multiplePreferences/MultiplePreferences';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { App } from './App';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomeLoader
      },
      {
        path: 'home',
        element: <Home />,
        loader: HomeLoader
      },
      {
        path: 'login',
        element: <Login />,
        loader: LoginLoader
      },
      {
        path: 'verify',
        element: <Verify />,
        loader: VerifyLoader
      },
      {
        path: 'settings',
        element: <Settings />,
        loader: SettingsLoader
      },
      {
        path: 'multiple-prefs',
        element: <MultiplePreferences />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
