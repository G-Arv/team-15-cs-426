import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/journal">Journal</Link>
                    </li>
                    <li>
                      <Link to="/schedule">Schedule</Link>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/settings">Settings</Link>
                    </li>
                  </ul>
                </nav>
    );
};

export default NavBar;