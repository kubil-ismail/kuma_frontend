import React from 'react';
import { Container } from 'react-bootstrap';
import header2 from '../../../assets/img/banner.jpg';

export default function index() {
  return (
    <section>
      <Container>
        <div className="banner animate__animated animate__fadeIn">
          <img src={header2} className="w-100" alt="Banner" />
        </div>
      </Container>
    </section>
  );
}
