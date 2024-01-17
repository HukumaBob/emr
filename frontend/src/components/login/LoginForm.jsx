import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions";

const LoginForm = ({ login, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password, onLoginSuccess);
    // Дополнительная логика, если необходимо
  };
  return (
    <Form data-bs-theme="dark" onSubmit={handleLogin}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            autoComplete="login"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3" controlId="submitLoginButton">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default connect(null, { login })(LoginForm);
