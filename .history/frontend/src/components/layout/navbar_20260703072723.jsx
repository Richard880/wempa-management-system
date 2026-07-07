import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

function Navigation() {
    return (
        <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
            <Container>

                <Navbar.Brand as={Link} to="/">
                    <strong>WEMPA</strong>
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>

                        <Nav.Link as={Link} to="/membership">
                            Membership
                        </Nav.Link>

                        <Nav.Link as={Link} to="/events">
                            Events
                        </Nav.Link>

                        <Nav.Link as={Link} to="/news">
                            News
                        </Nav.Link>

                        <Nav.Link as={Link} to="/contact">
                            Contact
                        </Nav.Link>

                    </Nav>

                    <Link to="../../pages//login">
                        <Button variant="outline-primary" className="me-2">
                            Login
                        </Button>
                    </Link>

                    <Link to="../../pages/public/register.jsx">
                        <Button>
                            Join WEMPA
                        </Button>
                    </Link>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default Navigation;