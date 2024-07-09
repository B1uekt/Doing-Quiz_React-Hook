import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
const Header = () => {
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
                        <button class="btn-login">Log in</button>
                        <button class="btn-signup">Sign up</button>
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