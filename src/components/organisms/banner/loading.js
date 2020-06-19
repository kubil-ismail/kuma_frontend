import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

export default function loading() {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <Skeleton height={200} />
        </Col>
      </Row>
    </Container>
  );
}
