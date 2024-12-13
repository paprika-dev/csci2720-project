import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

export const MyNavbar = ({ isAuthenticated, setIsAuthenticated, userInfo, setUserInfo }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // const [userInfo, setUserInfo] = useState({ username: '', isAdmin: false });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || { username: '', isAdmin: false };
        setUserInfo(user);
        //console.log(userInfo);
    }, []);
    

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        console.log(`Before logout: ${JSON.stringify(userInfo)}`);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        setUserInfo({ username: '', isAdmin: false });
        console.log(`After logout: ${JSON.stringify(userInfo)}`);
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
                    {userInfo.isAdmin ? <Nav.Link as={Link} to="/admin">Admin</Nav.Link> : null}
                </Nav>
                {!isAuthenticated &&
                <Nav>
                    <Button variant="outline-success" onClick={handleLogin}>Login</Button>
                </Nav>}
                {isAuthenticated &&
                <Nav>
                    <Navbar.Text className="me-4">
                        {userInfo.isAdmin ? `Admin: ${userInfo.username}` : userInfo.username}
                    </Navbar.Text>
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </Nav>}
            </Navbar.Collapse>
        </Navbar>
    );
};