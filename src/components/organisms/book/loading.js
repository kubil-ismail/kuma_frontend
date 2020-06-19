import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

export default function loading() {
  return (
    <Row>
      {/* Loader On Desktop */}
      <Col lg={3} className="d-none d-lg-block">
        <Skeleton height={350} />
        <div className="my-3" />
        <Skeleton count={3} />
      </Col>
      <Col lg={3} className="d-none d-lg-block">
        <Skeleton height={350} />
        <div className="my-3" />
        <Skeleton count={3} />
      </Col>
      <Col lg={3} className="d-none d-lg-block">
        <Skeleton height={350} />
        <div className="my-3" />
        <Skeleton count={3} />
      </Col>
      <Col lg={3} className="d-none d-lg-block">
        <Skeleton height={350} />
        <div className="my-3" />
        <Skeleton count={3} />
      </Col>
      {/* Loader On Mobile */}
      <Col lg={3} md={6} xs={6} className="d-lg-none">
        <Skeleton height={250} />
        <div className="my-3" />
        <Skeleton count={3} />
      </Col>
      <Col lg={3} md={6} xs={6} className="d-lg-none">
        <Skeleton height={250} />
        <div className="my-3" />
        <Skeleton count={3} />
      </Col>
    </Row>
  );
}
