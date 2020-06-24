/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Store from 'store2';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { googleProvider, facebookProvider } from './auth';
import { post } from '../../services';

import logo from '../../assets/img/logo.png';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      password2: null,
      loading: false,
      error: false,
      errorMsg: null,
    };
    if (Store('login')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  onSignUp = async () => {
    try {
      const { email, password, password2 } = this.state;
      if (password === password2) {
        const signUp = await post({
          url: 'auth/signIn',
          body: { email, password },
        });
        const { status } = signUp;
        if (status === 200) {
          const { history } = this.props;
          Store('email', email);
          history.push('/activate');
        } else {
          const { message } = signUp.response.data;
          this.setState({
            error: true,
            errorMsg: message,
            loading: false,
          });
        }
      } else {
        this.setState({
          error: true,
          errorMsg: 'Password not match',
          loading: false,
        });
      }
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    await this.onSignUp();
  };

  closeError = () => {
    this.setState({ error: false });
  };

  googleAuth = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { email, uid } = res.user;
        this.setState({ email, password: uid, password2: uid, loading: true });
        this.onSignUp();
      })
      .catch(() => {
        this.setState({
          error: true,
          errorMsg: 'Oopp.. something wrong',
          loading: false,
        });
      });
  };

  facebookAuth = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((res) => {
        const { email, uid } = res.user;
        if (email) {
          this.setState({ email, password: uid, loading: true });
          this.onLogin();
        } else {
          this.setState({
            error: true,
            errorMsg: 'Email not found',
            loading: false,
          });
        }
      })
      .catch(() => {
        this.setState({
          error: true,
          errorMsg: 'Oopp.. something wrong',
          loading: false,
        });
      });
  };

  render() {
    const { loading, error, errorMsg } = this.state;
    return (
      <>
        <Container>
          <Row>
            <Col lg={4} className="mx-auto my-5">
              <Link to="/">
                <img src={logo} className="w-50 mx-auto d-block" alt="kuma book" />
              </Link>
              <p className="font-weight-light text-dark text-center mt-3 mb-5">
                Sign Up to join the Kuma Book community.
              </p>
              {error ? (
                <Alert variant="danger" onClose={this.closeError} dismissible>
                  <Alert.Heading>Sign Up Failed</Alert.Heading>
                  <p>{errorMsg}</p>
                </Alert>
              ) : null}
              <Form onSubmit={this.onSubmit} className="mt-3 mb-3">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email address..."
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                  />
                  <Form.Text className="text-muted">
                    Minimum eight characters, at least one number
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword2">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password confirmation..."
                    onChange={(e) => this.setState({ password2: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button className="mt-4" variant="primary" type="submit" disabled={loading} block>
                  {loading ? 'Loading…' : 'Sign Up'}
                </Button>
              </Form>
              <hr className="my-4" />
              <Button variant="danger" className="btn-google" onClick={this.googleAuth} block>
                <i className="fab fa-google mr-2" aria-hidden="true" />
                <span>Sign Up with Google</span>
              </Button>
              <div className="my-2" />
              <Button variant="dark" className="btn-facebook" onClick={this.facebookAuth} block>
                <i className="fab fa-facebook mr-2" aria-hidden="true" />
                <span>Sign Up with Facebook</span>
              </Button>
              <div className="text-bottom text-center mt-4">
                <p className="font-weight-light text-dark d-inline mr-1">
                  Already have an account?
                </p>
                <Link to="login">Log In</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
