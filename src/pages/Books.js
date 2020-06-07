import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'

// Component
import Navbar from "../component/Navbar"
import Footer from '../component/Footer'
import Alert from '../component/Alert'
import Loader from '../component/Loader'
import Book from '../component/Book'

export default class Books extends Component {
  render() {
    return (
      <Fragment>
        <Navbar/>

        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={4}></Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </Fragment>
    )
  }
}
