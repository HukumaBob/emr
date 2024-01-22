import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import { Outlet } from "react-router-dom";
import {
  RiLoginCircleLine,
  RiLogoutCircleRLine,
  RiSettingsLine,
  RiCalendarLine,
  RiUser3Line,
  RiDashboard3Line,
} from "react-icons/ri";
import LoginForm from "../login/LoginForm";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogin(false);
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" className="bg-body-tertiary my-1 mx-1">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center">
              <Navbar.Brand href="https://hukumabob.github.io/">
                <img
                  src="../images/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-self-center"
                  alt="Endosoft logo"
                />
              </Navbar.Brand>
              <Nav.Link href="dashboard">
                <RiDashboard3Line size="2em" />
                Dashboard
              </Nav.Link>
              <Nav.Link href="patients">
                <RiUser3Line size="2em" />
                Patients
              </Nav.Link>
              <NavDropdown title="Sheduling" id="basic-nav-dropdown">
                <RiCalendarLine size="2em" />
                <NavDropdown.Item href="today-schedule">Today</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  This week
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  This month
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Whole time
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="setup">
                <RiSettingsLine size="2em" />
                System setup
              </Nav.Link>
            </Nav>

            <Nav>
              {isAuthenticated ? (
                <>
                  <Navbar.Text
                    onClick={handleLogout}
                    className="d-inline-block align-self-center"
                  >
                    Welcome, {username}
                    <RiLogoutCircleRLine size="2em" className=" pointed-icon" />
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Navbar.Text
                    onClick={handleShowLogin}
                    className="d-inline-block align-self-center pointed-icon"
                  >
                    Login
                    <RiLoginCircleLine size="2em" />
                  </Navbar.Text>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-secondary">
          <LoginForm onLoginSuccess={handleCloseLogin} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
