// import { RouteObject } from 'react-router-dom';
import {
  createBrowserRouter
} from "react-router";
import App from './home/App';
import Journal from "./journal/Journal";
import Schedule from './schedule/Schedule';
import Profile from './profile/Profile';
import Settings from './settings/Settings';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/journal',
    element: <Journal children={undefined}/>,
  },
  {
    path: '/schedule',
    element: <Schedule children={undefined}/>,
  },
  {
    path: '/profile',
    element: <Profile/>,
  },
  {
    path: '/settings',
    element: <Settings children={undefined}/>,
  }
]);

export default routes;