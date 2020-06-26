/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Row, Col, Badge, Alert, Form, Button } from 'react-bootstrap';
import Store from 'store2';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import ImageUploader from 'react-images-upload';

// Service
import { connect } from 'react-redux';
import { getBook } from '../../redux/actions/bookActions';
import { cover, get, patch, remove } from '../../services';

import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

const url = 'http://localhost:8000/';

export class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      genres: [],
      authors: [],
      bookName: null,
      bookLanguage: null,
      bookPublished: null,
      bookGenre: null,
      bookAuthor: null,
      bookStatus: null,
      bookDesc: null,
      error: false,
    };

    const { state } = this.props.location;
    if (!state) {
      const { history } = this.props;
      history.push('/');
    }

    if (!Store('login') && !Store('adminLogin') && !Store('pin')) {
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

      const genre = await get({ url: 'genre' });
      const author = await get({ url: 'author' });

      this.setState({
        book: result[0],
        bookName: result[0].name,
        bookLanguage: result[0].language,
        bookPublished: result[0].published,
        bookGenre: result[0].genre,
        bookAuthor: result[0].author,
        bookStatus: result[0].status,
        bookDesc: result[0].description,
        genres: genre.data.data,
        authors: author.data.data,
      });

      this.getSimilarBook();
      this.getReviewBook();
    } catch (error) {
      this.setState({ error: true });
    }
  };

  changeGenre = (e) => {
    this.setState({ bookGenre: e });
  };

  changeAuthor = (e) => {
    this.setState({ bookAuthor: e });
  };

  changeStatus = (e) => {
    this.setState({ bookStatus: e });
  };

  onDrop = async (event) => {
    if (event[0]) {
      try {
        const { id } = this.props.location.state;
        const picture = event[0];
        await cover(id, {
          image: picture,
          apikey: Store('apikey'),
        });
        this.getDetailBook();
        Swal.fire({
          title: 'Edit Cover success',
          text: '',
          icon: 'success',
        });
      } catch (error) {
        Swal.fire({
          title: 'Edit Failed',
          text: 'Make sure the code is correct',
          icon: 'error',
        });
      }
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { id } = this.props.location.state;
      const {
        book,
        bookName,
        bookDesc,
        bookPublished,
        bookLanguage,
        bookGenre,
        bookAuthor,
        bookStatus,
      } = this.state;

      await patch({
        url: `book/${id}`,
        body: {
          name: bookName || book.name,
          description: bookDesc || book.description,
          genre_id: bookGenre.value ? bookGenre.value : book.genre_id,
          author_id: bookAuthor.value ? bookAuthor.value : book.author_id,
          status_id: bookStatus.value ? bookStatus.value : book.status_id,
          published: bookPublished || book.published,
          language: bookLanguage || book.language,
        },
        config: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });

      this.getDetailBook();

      Swal.fire({
        title: 'Edit Book success',
        text: '',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Edit Book failed',
        text: '',
        icon: 'error',
      });
    }
  };

  onDelete = async () => {
    try {
      const { id } = this.props.location.state;
      await remove({
        url: `book/${id}`,
        body: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });
      Swal.fire({
        title: 'Delete Book success',
        text: '',
        icon: 'success',
      }).then(() => {
        const { history } = this.props;
        history.push('/admin/book');
      });
    } catch (error) {
      Swal.fire({
        title: 'Delete Book failed',
        text: '',
        icon: 'error',
      }).then(() => {
        const { history } = this.props;
        history.push('/admin/book');
      });
    }
  };

  componentDidMount = () => {
    this.getDetailBook();
  };

  render() {
    const { book, bookGenre, bookAuthor, bookStatus, error } = this.state;
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
                    <Button variant="danger" className="mb-3 w-25 ml-auto" onClick={this.onDelete}>
                      Delete
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </section>

        <br />

        <section>
          <Container>
            <div className="head-title">
              <h2 className="font-weight-bold">Update Book</h2>
              <div className="divinder" />
            </div>
            <Row>
              <Col lg={4}>
                <ImageUploader
                  withIcon
                  singleImage
                  buttonText="Choose images"
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                />
              </Col>
              {book ? (
                <Col lg={8}>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="bookName">
                      <Form.Label>Book Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={book.name}
                        onChange={(e) => this.setState({ bookName: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="bookLanguage">
                      <Form.Label>Language</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={book.language}
                        onChange={(e) => this.setState({ bookLanguage: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="bookDate">
                      <Form.Label>Publish Date</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={book.published}
                        onChange={(e) => this.setState({ bookPublished: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="bookGenre">
                      <Form.Label>Genre</Form.Label>
                      <Select
                        onChange={this.changeGenre}
                        value={{ label: bookGenre.label || bookGenre, value: bookAuthor.value }}
                        options={this.state.genres.map((val) => ({
                          value: val.id,
                          label: val.name,
                        }))}
                      />
                    </Form.Group>
                    <Form.Group controlId="bookAuthor">
                      <Form.Label>Author</Form.Label>
                      <Select
                        onChange={this.changeAuthor}
                        value={{ label: bookAuthor.label || bookAuthor, value: bookAuthor.value }}
                        options={this.state.authors.map((val) => ({
                          value: val.id,
                          label: val.name,
                        }))}
                      />
                    </Form.Group>
                    <Form.Group controlId="bookAuthor">
                      <Form.Label>Status</Form.Label>
                      <Select
                        onChange={this.changeStatus}
                        value={{ label: bookStatus.label || bookStatus, value: bookStatus.value }}
                        options={[
                          { value: 1, label: 'Available' },
                          { value: 2, label: 'Pending' },
                          { value: 3, label: 'Not Available' },
                        ]}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="5"
                        defaultValue={book.description}
                        onChange={(e) => this.setState({ bookDesc: e.target.value })}
                      />
                    </Form.Group>
                    <Button className="mb-3 w-25 ml-auto" type="submit">
                      Update
                    </Button>
                  </Form>
                </Col>
              ) : null}
            </Row>
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = { getBook };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
