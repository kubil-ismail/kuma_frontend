/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import Store from 'store2';
import Skeleton from 'react-loading-skeleton';
import { get } from '../services';

// Component
import Navbar from '../components/organisms/navbar';
import Book from '../components/organisms/book';
import Review from '../components/organisms/review';
import BookLoader from '../components/organisms/book/loading';
import Alert from '../components/atoms/alert';
import Footer from '../components/organisms/footer';

const url = 'http://localhost:8000/';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      similar: [],
      review: [],
      error: false,
    };
    const { state } = this.props.location;
    if (!state) {
      const { history } = this.props;
      history.push('/');
    }
  }

  getDetailBook = async () => {
    try {
      const { id } = this.props.location.state;
      Store('bookId', id);
      const detail = await get({
        url: `book/${id}`,
      });
      const { data } = detail.data;
      this.setState({ book: data[0] });
      this.getSimilarBook();
      this.getReviewBook();
    } catch (error) {
      this.setState({ error: true });
    }
  };

  getSimilarBook = async () => {
    try {
      const { genre_id } = this.state.book;
      const similar = await get({
        url: `book/genre/${genre_id}?limit=4`,
      });
      const { data } = similar.data;
      this.setState({ similar: data });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  getReviewBook = async () => {
    try {
      const { id } = this.props.location.state;
      const review = await get({
        url: `review/${id}?limit=4`,
        config: {
          params: { book_id: id },
        },
      });
      const { data } = review.data;
      this.setState({ review: data });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  componentDidMount = () => {
    this.getDetailBook();
  };

  componentDidUpdate = (props) => {
    const { id } = this.props.location.state;
    if (Store('bookId') !== id) {
      this.getDetailBook();
    }
  };

  render() {
    const { book, similar, review, error } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        {/* Banner Cover */}
        {book ? (
          <div className="banner-cover" style={{ backgroundImage: `url(${url + book.cover})` }} />
        ) : null}

        {/* Book Detail */}
        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={3}>
                {!book ? (
                  <div className="mb-5">
                    <Skeleton height={350} />
                  </div>
                ) : (
                  <img
                    src={url + book.cover}
                    className="w-100 rounded shadow-lg mb-5 mb-lg-0"
                    alt={book.name}
                  />
                )}
              </Col>
              <Col lg={9}>
                {!book ? (
                  <div className="mb-5">
                    {error ? <Alert message="Can't get book from server" /> : null}
                    <Skeleton height={50} className="mb-4" />
                    <Skeleton count={5} />
                    {/* Show if failed fetch */}
                  </div>
                ) : (
                  <>
                    <h2 className="font-weight-bold text-dark">{book.name}</h2>
                    <p className="font-weight-bold text-dark">{book.author}</p>
                    <Badge pill variant="primary mr-2 py-2 px-2">
                      {book.genre}
                    </Badge>
                    <Badge pill variant="dark py-2 px-2">
                      {book.language}
                    </Badge>
                    <p className="mt-3 text-justify text-dark">{book.description}</p>
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
            {error ? <Alert message="Can't get review from server" /> : null}

            {/* Fetch book */}
            {!review.length ? (
              <Alert message="Review not found" variant="warning" />
            ) : (
              review.map((val) => <Review key={val.id} review={val.review} user={val.fullname} />)
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

            {/* Fetch book */}
            {!book ? (
              <BookLoader />
            ) : (
              <Row>
                {similar.map((val) => (
                  <Col lg={3} md={6} xs={6} key={val.id}>
                    <Book
                      id={val.id}
                      cover={val.cover}
                      title={val.name}
                      author={val.author}
                      genre={val.genre}
                      languag={val.language}
                    />
                  </Col>
                ))}
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
