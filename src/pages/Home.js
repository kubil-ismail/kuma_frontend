import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import header from '../assets/img/header.png';
import cover from '../assets/img/cover.jpg';

// Component
import Navbar from '../components/organisms/navbar';
import Book from '../components/organisms/book';
import BookLoader from '../components/organisms/book/loading';
import Alert from '../components/atoms/alert';
import Banner from '../components/organisms/banner';
import BannerLoader from '../components/organisms/banner/loading';
import Footer from '../components/organisms/footer';

export default class Home extends Component {
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
        <Navbar />

        {/* Header */}
        <header>
          <Container className="my-5">
            <Row>
              <Col lg={6}>
                <img src={header} className="w-100" alt="banner" />
              </Col>
              <Col lg={{ span: 5, offset: 1 }} className="d-flex align-items-center mt-5 mt-lg-0">
                <div className="banner-content">
                  <h1 className="font-weight-bold">Kuma Book</h1>
                  <p>The world&apos;s largest novel and manga wikipedia and database 100% free</p>
                </div>
              </Col>
            </Row>
          </Container>
        </header>

        {/* Popular Book */}
        <section>
          <Container className="my-5">
            <div className="head-title">
              <h3 className="main-title font-weight-bold">Popular Book</h3>
              <div className="divinder" />
            </div>

            {error ? <Alert message="Can't get book from server" /> : null}

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

        {/* Genre */}
        {/* <section>
          <Container className="my-5">
            <div className="head-title">
              <h3 className="main-title font-weight-bold">Genre</h3>
              <div className="divinder" />
            </div>
            <Row>
              <Col lg={3}>
                <Book
                  cover={cover}
                  title="Overlord"
                  author="Maruyama Sensei"
                  genre="Horror"
                  languag="Japan"
                />
              </Col>
            </Row>
          </Container>
        </section> */}

        {/* Banner */}
        {!books.length ? <BannerLoader /> : <Banner />}

        <div className="my-5" />

        {/* Footer */}
        <Footer />
      </>
    );
  }
}
