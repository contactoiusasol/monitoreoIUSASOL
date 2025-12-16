import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from './layouts/dashboard/layout';
import IconsPage from './pages/icons';
import NotFoundPage from './pages/404';
import TablaPage from './pages/tabla';
import GraficasPage from './pages/graficas';
import SettingsPage from './pages/settings';
import DatabaseIUSASOLPage from './pages/databaseiusasol';
import ThemePage from './pages/theme';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { PrivateRoute } from './components/private-route';

export const routes = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    element: (
      <PrivateRoute>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <GraficasPage />
      },
      {
        path: 'tabla21m',
        element: <TablaPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'databaseiusasol',
        element: <DatabaseIUSASOLPage />
      },
      {
        path: 'theme',
        element: <ThemePage />
      },
      {
        path: 'icons',
        element: <IconsPage />
      }
    ]
  },
  {
    path: '404',
    element: <NotFoundPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
