/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import cover from '../assets/img/cover.jpg';

// Component
import Navbar from '../components/organisms/navbar';
import Book from '../components/organisms/book';
import BookLoader from '../components/organisms/book/loading';
import Alert from '../components/atoms/alert';
import Footer from '../components/organisms/footer';

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false,
    };
  }

  render() {
    const { books, error } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        {/* Popular Book */}
        <section>
          <Container className="my-5">
            <div className="head-title">
              <h3 className="main-title font-weight-bold">List Book</h3>
              <div className="divinder" />
            </div>

            {/* Show if failed fetch */}
            {error ? <Alert message="Can't get book from server" /> : null}

            {/* Fetch books */}
            {!books.length ? (
              <BookLoader />
            ) : (
              <Row>
                <Col lg={3} md={6} xs={6}>
                  <Book
                    cover={cover}
                    title="Overlord"
                    author="Maruyama Sensei"
                    genre="Horror"
                    languag="Japan"
                  />
                </Col>
                <Col lg={3} md={6} xs={6}>
                  <Book
                    cover={cover}
                    title="Overlord"
                    author="Maruyama Sensei"
                    genre="Horror"
                    languag="Japan"
                  />
                </Col>
                <Col lg={3} md={6} xs={6}>
                  <Book
                    cover={cover}
                    title="Overlord"
                    author="Maruyama Sensei"
                    genre="Horror"
                    languag="Japan"
                  />
                </Col>
                <Col lg={3} md={6} xs={6}>
                  <Book
                    cover={cover}
                    title="Overlord"
                    author="Maruyama Sensei"
                    genre="Horror"
                    languag="Japan"
                  />
                </Col>
              </Row>
            )}
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}
