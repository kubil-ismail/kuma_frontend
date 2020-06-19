import React from 'react';
import { Container } from 'react-bootstrap';
import header2 from '../../../assets/img/header_2.png';

export default function index() {
  return (
    <section>
      <Container>
        <div className="banner">
          <img src={header2} className="w-100" alt="Banner" />
        </div>
      </Container>
    </section>
  );
}
