import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import header2 from '../../../assets/img/banner.jpg';

export default function index() {
  return (
    <section>
      <Container>
        <div className="banner animate__animated animate__fadeIn">
          <Link
            className="dropdown-item"
            to={{
              pathname: `/book`,
              search: '?search=harry potter',
              state: 'harry potter',
            }}
          >
            <img src={header2} className="w-100" alt="Banner" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
