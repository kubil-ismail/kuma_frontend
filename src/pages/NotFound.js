import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Alert from '../component/Alert'

export default class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Container>
          <Row>
            <Col lg={12}>
              <section>
                <div className="animate__animated animate__shakeX mt-5">
                  <Alert variant="danger" message="Page not found" />
                </div>
              </section>
            </Col>
          </Row>
        </Container>
        <div className="sticky-bottom">
          <Footer />
        </div>
      </Fragment>
    )
  }
}
