import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

export const MyNavbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/login');
    };

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
                    {user.isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
                </Nav>
                <Nav>
                    <Navbar.Text className="me-4">
                        {user.isAdmin ? `Admin: ${user.username}` : user.username}
                    </Navbar.Text>
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};