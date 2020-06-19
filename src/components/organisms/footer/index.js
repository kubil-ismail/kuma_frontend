import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function index() {
  return (
    <footer>
      <div className="head-footer text-white">
        <Container>
          <Row>
            <Col lg={6}>
              <h3 className="font-weight-bold">Kuma Book</h3>
              <p>
                Welcome to the Kuma Book online Forum The world&apos;s largest novel and manga
                wikipedia and database 100% free
              </p>
            </Col>
            <Col lg={{ span: 4, offset: 2 }}>
              <h3 className="font-weight-bold">Contact Us</h3>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bottom-footer mt-4 py-1">
        <p className="text-white text-center mt-2">@ 2017 All Rights Reserved OYEENok</p>
      </div>
    </footer>
  );
}
