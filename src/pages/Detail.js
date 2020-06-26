/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Row, Col, Badge, Button, Modal, Form } from 'react-bootstrap';
import Store from 'store2';
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';
import Swal from 'sweetalert2';
import ScrollToTop from 'react-scroll-up';

// Service
import { connect } from 'react-redux';
import { getBook, getSimilar, getReview } from '../redux/actions/bookActions';
import { addFavorite } from '../redux/actions/favoritesActions';
import { post } from '../services';

// Component
import Navbar from '../components/organisms/navbar';
import Book from '../components/organisms/book';
import Review from '../components/organisms/review';
import BookLoader from '../components/organisms/book/loading';
import Alert from '../components/atoms/alert';
import Footer from '../components/organisms/footer';

const url = 'http://localhost:8000/';

export class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      similar: [],
      review: [],
      error: false,
      modal: false,
      ratingInput: 0,
      reviewInput: null,
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
      await this.props.getBook(`/${id}`);
      const { result } = this.props.books;
      this.setState({ book: result[0] });
      this.getSimilarBook();
      this.getReviewBook();
    } catch (error) {
      this.setState({ error: true });
    }
  };

  getSimilarBook = async () => {
    try {
      const { genre_id } = this.state.book;
      await this.props.getSimilar(`/genre/${genre_id}?limit=4`);
      const { similar } = this.props.books;
      this.setState({ similar });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  getReviewBook = async () => {
    try {
      const { id } = this.props.location.state;
      await this.props.getReview({ id });
      const { review } = this.props.books;
      this.setState({ review });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  addFavorite = async () => {
    try {
      const { id } = this.props.location.state;
      this.props.addFavorite({
        id,
        userId: Store('userId'),
        apikey: Store('apikey'),
      });
      Swal.fire('Added to favorites', 'successfully added to favorites', 'success');
    } catch (error) {
      this.setState({ error: true });
    }
  };

  addReview = async (e) => {
    e.preventDefault();
    try {
      const { id } = this.props.location.state;
      const { ratingInput, reviewInput } = this.state;
      await post({
        url: 'review',
        body: {
          book_id: id,
          user_id: Store('userId'),
          rating: parseInt(ratingInput.value, 10),
          review: reviewInput,
        },
        config: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });
      Swal.fire('Review successfully', 'successfully added review', 'success');
      this.getReviewBook();
      this.setState({
        modal: false,
        ratingInput: 0,
        reviewInput: null,
      });
    } catch (error) {
      Swal.fire('Opps something Wrong', 'failed added review', 'failed');
    }
  };

  showModal = () => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  changeRating = (e) => {
    this.setState({ ratingInput: e });
  };

  componentDidMount = () => {
    this.getDetailBook();
  };

  componentDidUpdate = () => {
    const { id } = this.props.location.state;
    if (Store('bookId') !== id) {
      this.getDetailBook();
    }
  };

  render() {
    const { book, similar, review, ratingInput, reviewInput, error, modal } = this.state;
    const rating = [];
    for (let index = 1; index <= 10; index++) {
      rating.push({ value: index, label: index });
    }
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        {/* Banner Cover */}
        {book ? (
          <div
            className="banner-cover animate__animated animate__fadeIn"
            style={{ backgroundImage: `url(${url + book.cover})` }}
          />
        ) : null}

        {/* Book Detail */}
        <section>
          <Container className="my-5">
            <Row>
              <Col lg={3}>
                {!book ? (
                  <div className="mb-5">
                    <Skeleton height={350} />
                  </div>
                ) : (
                  <img
                    src={url + book.cover}
                    className="w-100 animate__animated animate__fadeIn animate__slow rounded shadow-lg mb-5 mb-lg-0"
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
                    {Store('login') ? (
                      <>
                        <Button className="text-dark" onClick={() => this.addFavorite()}>
                          Add to favorite
                        </Button>
                        <Button variant="dark" className="ml-2" onClick={this.showModal}>
                          Add Review
                        </Button>
                      </>
                    ) : null}
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
              review.map((val) => (
                <Review key={val.id} review={val.review} rating={val.rating} user={val.fullname} />
              ))
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
                    <ScrollToTop style={{ position: 'relative !important' }} showUnder={0}>
                      <Book
                        id={val.id}
                        cover={val.cover}
                        title={val.name}
                        author={val.author}
                        genre={val.genre}
                        language={val.language}
                      />
                    </ScrollToTop>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </section>

        <Modal show={modal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Review Book</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.addReview}>
            <Modal.Body>
              <Form.Group controlId="formBasicBook">
                <Form.Label>Book Name</Form.Label>
                <Form.Control defaultValue={book ? book.name : 'Unknown'} readOnly />
              </Form.Group>
              <Form.Group controlId="formBasicRating">
                <Form.Label>Rating</Form.Label>
                <Select value={ratingInput} onChange={this.changeRating} options={rating} />
              </Form.Group>
              <Form.Group controlId="formBasicReview">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e) => this.setState({ reviewInput: e.target.value })}
                  rows="3"
                  defaultValue={reviewInput}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = { getBook, getSimilar, getReview, addFavorite };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
