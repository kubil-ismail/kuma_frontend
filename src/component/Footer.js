import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="bg-dark animate__animated animate__fadeIn" >
      <Container>
        <Row>
          <Col lg={12} className="mt-sm-2 text-center text-white py-2">
            <p className="h6 text-white">© All right Reversed | Build By <a href="https://github.com/kubil-ismail" >Bilkis Ismail</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
