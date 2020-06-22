import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { get } from '../services';

import header from '../assets/img/header.png';

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

  getPopularBook = async () => {
    try {
      const books = await get({ url: 'book?limit=4' });
      const { data } = books.data;
      this.setState({
        books: data,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  componentDidMount = () => {
    this.getPopularBook();
  };

  render() {
    const { books, error } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

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

            {/* Show if failed fetch */}
            {error ? <Alert message="Can't get book from server" /> : null}

            {/* Fetch books */}
            {!books.length ? (
              <BookLoader />
            ) : (
              <Row>
                {books.map((val) => (
                  <Col lg={3} md={6} xs={6} key={val.id}>
                    <Book
                      id={val.id}
                      cover={val.cover}
                      title={val.name}
                      author={val.author}
                      genre={val.genre}
                      language={val.language}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </section>

        {/* Banner */}
        {!books.length ? <BannerLoader /> : <Banner />}

        <div className="my-5" />

        {/* Footer */}
        <Footer />
      </>
    );
  }
}
