import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import LoginForm from "../login/LoginForm";
import "./Header.css";

function Header({ isAuthenticated, logout }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="../images/logo.svg"
              width="30"
              height="40"
              className="d-inline-block align-top"
              alt="Endosoft logo"
              href="https://hukumabob.github.io/"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#patient">Patients</Nav.Link>
              <NavDropdown title="Sheduling" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Today</NavDropdown.Item>
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
              onClick={handleShow}
            />
          ) : (
            <img
              src="../../images/login.svg"
              width="30"
              height="30"
              className="d-inline-block align-top  inverted-icon"
              alt="login"
              onClick={handleShow}
            />
          )}
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-secondary">
          <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
