// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import locationSVG from '../assets/location.svg'
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
        setUserInfo({ username: null, admin: false, location: null });
        navigate('/');
    };

    // hide navbar on login page and register page
    if (location.pathname === "/login" || location.pathname === "/register") {
        return(<></>)
    }

    return (
        <Navbar id="navbar" expand="lg" className="bg-body-tertiary px-4">
            <Navbar.Brand id="navbar-brand" as={Link} to="/">LosGehts</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/map">Map</Nav.Link>
                    <Nav.Link as={Link} to="/locations">Locations</Nav.Link>
                    <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
                    <Nav.Link as={Link} to="/events">Events</Nav.Link>
                    {userInfo.admin ? 
                        <>
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Nav.Link as={Link} to="/admin/users">Manage Users</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Nav.Link as={Link} to="/admin/events">Manage Events</Nav.Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        </> 
                        : null
                    }
                </Nav>
                {!userInfo.username &&
                <Nav>
                    <Button variant="outline-success" onClick={handleLogin}>Login</Button>
                </Nav>}
                {userInfo.username &&
                <Nav className='align-items-center'>
                    <Navbar.Text className="me-4 user-location">
                        <img src={locationSVG} />{userInfo.location.name}
                    </Navbar.Text>
                    <Navbar.Text className="me-4">
                        {userInfo.admin ? `Admin: ${userInfo.username}` : userInfo.username}
                    </Navbar.Text>
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </Nav>}
            </Navbar.Collapse>
        </Navbar>
    );
};