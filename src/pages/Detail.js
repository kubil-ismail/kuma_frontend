/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

import cover from '../assets/img/cover.jpg';

// Component
import Navbar from '../components/organisms/navbar';
import Book from '../components/organisms/book';
import BookLoader from '../components/organisms/book/loading';
import Alert from '../components/atoms/alert';
import Footer from '../components/organisms/footer';

export default class Detail extends Component {
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

        {/* Banner Cover */}
        {books.length ? (
          <div className="banner-cover" style={{ backgroundImage: `url(${cover})` }} />
        ) : null}

        {/* Book Detail */}
        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={3}>
                {!books.length ? (
                  <div className="mb-5">
                    <Skeleton height={350} />
                  </div>
                ) : (
                  <img src={cover} className="w-100 rounded shadow-lg mb-5 mb-lg-0" alt="Cover" />
                )}
              </Col>
              <Col lg={9}>
                {!books.length ? (
                  <div className="mb-5">
                    <Skeleton height={50} className="mb-4" />
                    <Skeleton count={5} />
                  </div>
                ) : (
                  <>
                    <h2 className="font-weight-bold text-dark">Overlord 3</h2>
                    <p className="font-weight-bold text-dark">Maruyama Sensei</p>
                    <Badge pill variant="primary mr-2 py-2 px-2">
                      Fantasy
                    </Badge>
                    <Badge pill variant="dark py-2 px-2">
                      Japan
                    </Badge>
                    <p className="mt-3 text-justify text-dark">lorem ipsum sir dolor amet</p>
                    <Button className="text-dark">Add to favorite</Button>
                    <Button variant="dark" className="ml-2">
                      Add Review
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="my-5 animate__animated animate__fadeIn">
            <div className="head-title">
              <h2 className="font-weight-bold">Review Book</h2>
              <div className="divinder" />
            </div>
            {/* Show if failed fetch */}
            {error ? <Alert message="Can't get book from server" /> : null}

            {/* Fetch books */}
            {!books.length ? (
              <Skeleton count={4} height={50} />
            ) : (
              <Row>
                <Col lg={12}>
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

        <section>
          <Container className="my-5 animate__animated animate__fadeIn">
            <div className="head-title">
              <h2 className="font-weight-bold">Similar Book</h2>
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
