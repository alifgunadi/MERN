import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import './Login.css';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, isLoading, isError }] = useLoginMutation();

  function handleLogin(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1>Log in to your account</h1>

            {isError && <Alert variant="danger">{error.data}</Alert>}
            
            <Form.Group mb="3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group mb="3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} required onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group mb="3">
                <Button type="submit" className="register" disabled={isLoading}>Login</Button>
            </Form.Group>
            <p className="pt-3 text-center">
              Don't have an account? <Link to="/signup" className="create--account">Create account</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Login;
