import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './Routes';

const AppRouter = () => {
    const element = useRoutes(routes);
    
      return <Router>{element}</Router>;
  };

export default AppRouter;