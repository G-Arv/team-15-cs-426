import { RouteObject } from 'react-router-dom';
import App from './home/App';
import Journal from "./journal/Journal";
import Schedule from './schedule/Schedule';
import Profile from './profile/Profile';
import Settings from './settings/Settings';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/journal',
    element: <Journal />,
  },
  {
    path: '/schedule',
    element: <Schedule />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/settings',
    element: <Settings />,
  }
];

export default routes;