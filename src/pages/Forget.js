import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Navbar from '../component/Navbar'

export default class Forget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      emailSend: false,
      pin: null
    }
  }

  render() {
    const { emailSend } = this.state
    return (
      <Fragment>
        <div className="d-lg-none">
          <Navbar />
        </div>
        <Container fluid>
          <Row className="no-gutter">
            <Col md={4} lg={5} className="d-none d-md-flex bg-image"></Col>
            <Col md={12} lg={7}>
              <div className="login d-lg-flex align-items-center py-5 mt-0 mt-lg-5">
                <Container>
                  <Row>
                    <Col md={9} lg={8} className="mx-auto">
                      <h3 className="login-heading mb-4">Forget Password</h3>
                      <Form>
                        {!emailSend && (
                          <Form.Group className="form-label-group" controlId="inputEmail">
                            <Form.Control type="email" placeholder="Email address" onChange={(e) => this.setState({ email: e.target.value })} required autoFocus />
                            <Form.Label>Email address</Form.Label>
                          </Form.Group>
                        )}
                        {emailSend && (
                          <Form.Group className="form-label-group" controlId="inputPin">
                            <Form.Control type="text" placeholder="Pin" onChange={(e) => this.setState({ pin: e.target.value })} required />
                            <Form.Label>Pin</Form.Label>
                          </Form.Group>
                        )}
                        <Button className="btn-lg btn-block btn-login mb-2" type="submit">{emailSend ? 'Verify Account' : 'Send Pin'}</Button>

                        <div className="text-center">
                          <Link className="small" to="/sign-up">Create new account</Link>
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
