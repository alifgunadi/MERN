import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import './Navigation.css';
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { logout } from '../features/userSlice';
import { useDispatch } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  };

  console.log(user);

  return (
        <Navbar fixed="top" bg="light" variant="light" expand="lg">
          <Container>
            <LinkContainer to="/">
                <Navbar.Brand>lifShops</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                )}
                {user && (
                <>
                  <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">

                    {user.admin && (
                      <>
                        <LinkContainer to="/dashboard" className="dropdown">
                          <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/new-product" className="dropdown-form">
                          <Nav.Link>Create Product</Nav.Link>
                        </LinkContainer>
                      </>
                    )}

                    {!user.admin && (
                      <>
                        <LinkContainer to="/carts" className="dropdown-form">
                          <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/orders" className="dropdown-form">
                          <Nav.Link>My orders</Nav.Link>
                        </LinkContainer>
                      </>
                    )}

                    <NavDropdown.Divider />
                      <Button variant="danger" onClick={handleLogout} className="logout-btn">Logout</Button>
                      
                  </NavDropdown>
                </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Navigation;
