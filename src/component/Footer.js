import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="bg-dark animate__animated animate__fadeIn" >
      <Container>
        <Row>
          <Col lg={12} className="mt-sm-2 text-center text-white py-2">
            <p className="h6">© All right Reversed | Build By <a className="text-green ml-2" href="https://www.sunlimetech.com" >Bilkis Ismail</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
