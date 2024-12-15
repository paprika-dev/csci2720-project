import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

export const MyNavbar = ({ userInfo, setUserInfo }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            console.log('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
        localStorage.removeItem('user');
        setUserInfo({ username: null, admin: false });
        navigate('/');
    };

    // hide navbar on login page and register page
    if (location.pathname === "/login" || location.pathname === "/register") {
        return(<></>)
    }

    return (
        <Navbar id="navbar" expand="md" className="bg-body-tertiary px-4">
            <Navbar.Brand id="navbar-brand" as={Link} to="/">LosGehts</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/map">Map</Nav.Link>
                    <Nav.Link as={Link} to="/locations">Locations</Nav.Link>
                    <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
                    <Nav.Link as={Link} to="/events">Events</Nav.Link>
                    {userInfo.admin ? <Nav.Link as={Link} to="/admin">Admin</Nav.Link> : null}
                </Nav>
                {!userInfo.username &&
                <Nav>
                    <Button variant="outline-success" onClick={handleLogin}>Login</Button>
                </Nav>}
                {userInfo.username &&
                <Nav>
                    <Navbar.Text className="me-4">
                        {userInfo.admin ? `Admin: ${userInfo.username}` : userInfo.username}
                    </Navbar.Text>
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </Nav>}
            </Navbar.Collapse>
        </Navbar>
    );
};