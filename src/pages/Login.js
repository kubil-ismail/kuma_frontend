import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Navbar from '../component/Navbar'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null
    }
  }

  render() {
    return (
      <Fragment>
        <div className="d-lg-none">
          <Navbar/>
        </div>
        <Container fluid>
          <Row className="no-gutter">
            <Col md={4} lg={5} className="d-none d-md-flex bg-image"></Col>
            <Col md={12} lg={7}>
              <div className="login d-flex align-items-center py-5">
                <Container>
                  <Row>
                    <Col md={9} lg={8} className="mx-auto">
                      <h3 className="login-heading mb-4">Welcome back!</h3>
                      <Form>
                        <Form.Group className="form-label-group" controlId="inputEmail">
                          <Form.Control type="email" placeholder="Email address" onChange={(e) => this.setState({ email: e.target.value })} required autoFocus />
                          <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-label-group" controlId="inputPassword">
                          <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} required />
                          <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <div className="custom-control custom-checkbox mb-3">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                        </div>

                        <Button className="btn-lg btn-block btn-login mb-2" type="submit">Login</Button>
                        <div className="text-center">
                          <Link className="small" to="/forget">Forgot password?</Link>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}
