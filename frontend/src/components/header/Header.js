import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import { Outlet } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import "./Header.css";
import { connect } from "react-redux";
import { logout } from "../../actions";

function Header({ isAuthenticated, logout }) {
  console.log("isAuthenticated: ", isAuthenticated);
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleLogout = () => {
    logout(); // Вызов действия logout
    setShowLogin(false); // Закрыть модальное окно, если оно открыто
  };

  return (
    <>
      <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="https://hukumabob.github.io/">
            <img
              src="../images/logo.svg"
              width="30"
              height="40"
              className="d-inline-block align-top"
              alt="Endosoft logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="dashboard">Dashboard</Nav.Link>
              <Nav.Link href="patients">Patients</Nav.Link>
              <NavDropdown title="Sheduling" id="basic-nav-dropdown">
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
            </Nav>
          </Navbar.Collapse>

          {isAuthenticated ? (
            <img
              src="../../images/logout.svg"
              width="30"
              height="30"
              className="d-inline-block align-top  inverted-icon"
              alt="logout"
              onClick={handleLogout}
            />
          ) : (
            <img
              src="../../images/login.svg"
              width="30"
              height="30"
              className="d-inline-block align-top  inverted-icon"
              alt="login"
              onClick={handleShowLogin}
            />
          )}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
