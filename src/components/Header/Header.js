import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/signup')
    }
    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>

                <NavLink to="/" activeClassName="active" className="navbar-brand ">React-Bootstrap</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" activeClassName="active" className="nav-link ">Home</NavLink>
                        <NavLink to="users" activeClassName="active" className="nav-link ">User</NavLink>
                        <NavLink to="admins" activeClassName="active" className="nav-link ">Admin</NavLink>
                    </Nav>
                    <Nav>
                        {/* <Link to="/login">
                            <button className="btn-login">Log in</button>
                        </Link> */}
                        <button className="btn-login" onClick={() => handleLogin()}>Log in</button>
                        <button class="btn-signup" onClick={() => handleSignup()}>Sign up</button>
                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Log in</NavDropdown.Item>
                            <NavDropdown.Item >Log out</NavDropdown.Item>
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;