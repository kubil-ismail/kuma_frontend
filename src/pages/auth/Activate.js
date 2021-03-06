/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Store from 'store2';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { post } from '../../services';

import logo from '../../assets/img/logo.png';

export default class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: Store('email') || null,
      code: null,
      loading: false,
      error: false,
      errorMsg: null,
    };
    if (Store('login')) {
      const { history } = this.props;
      history.push('/sign-up');
    }
  }

  onActivate = async () => {
    try {
      const { email, code } = this.state;
      const activate = await post({
        url: 'auth/activate',
        body: { email, code },
      });
      const { status } = activate;
      if (status) {
        const { history } = this.props;
        Swal.fire('Activate success', 'successfully activate account', 'success');
        history.push('/login');
      } else {
        const { message } = activate.response.data;
        this.setState({
          error: true,
          errorMsg: message,
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
    await this.onActivate();
  };

  closeError = () => {
    this.setState({ error: false });
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
                Activate account to join the Kuma Book community.
              </p>
              {error ? (
                <Alert variant="danger" onClose={this.closeError} dismissible>
                  <Alert.Heading>Login Failed</Alert.Heading>
                  <p>{errorMsg}</p>
                </Alert>
              ) : null}
              <Form onSubmit={this.onSubmit} className="mt-3 mb-3">
                <Form.Group controlId="formBasicPin">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pin code..."
                    onChange={(e) => this.setState({ code: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button className="mt-4" variant="primary" type="submit" disabled={loading} block>
                  {loading ? 'Loading…' : 'Activate'}
                </Button>
              </Form>
              <div className="text-bottom text-center">
                <p className="font-weight-light text-dark d-inline mr-1">
                  Don&apos;t have an account?
                </p>
                <Link to="sign-up">Sign Up</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
