import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Navbar from '../component/Navbar'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: null,
      email: null,
      password: null,
      password2: null,
    }
  }

  render() {
    return (
      <Fragment>
        <div className="d-lg-none">
          <Navbar />
        </div>
        <Container fluid>
          <Row className="no-gutter">
            <Col md={4} lg={5} className="d-none d-md-flex bg-image"></Col>
            <Col md={12} lg={7}>
              <div className="login d-flex align-items-center py-5">
                <Container>
                  <Row>
                    <Col md={9} lg={8} className="mx-auto">
                      <h3 className="login-heading mb-4">Sign Up</h3>
                      <Form>
                        <Form.Group className="form-label-group" controlId="inputFullname">
                          <Form.Control type="text" placeholder="Full Name" onChange={(e) => this.setState({ fullname: e.target.value })} required autoFocus />
                          <Form.Label>Full Name</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-label-group" controlId="inputEmail">
                          <Form.Control type="email" placeholder="Email address" onChange={(e) => this.setState({ email: e.target.value })} required autoFocus />
                          <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-label-group" controlId="inputPassword">
                          <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} required />
                          <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-label-group" controlId="inputPassword2">
                          <Form.Control type="password" placeholder="Password Confirmation" onChange={(e) => this.setState({ password2: e.target.value })} required />
                          <Form.Label>Password Confirmation</Form.Label>
                        </Form.Group>

                        <Button className="btn-lg btn-block btn-login mb-2" type="submit">Sign Up</Button>
                        <div className="text-center">
                          <Link className="small" to="/login">Already Have Account ??</Link>
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
