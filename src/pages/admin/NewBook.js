/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Select from 'react-select';
import Store from 'store2';
import Swal from 'sweetalert2';
import ImageUploader from 'react-images-upload';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// Service
import { connect } from 'react-redux';
import { postBook } from '../../redux/actions/bookActions';
import { fetchGenre } from '../../redux/actions/genreActions';
import { fetchAuthor } from '../../redux/actions/authorActions';

// Component
import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

export class newBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      authors: [],
      bookName: null,
      bookLanguage: null,
      bookPublished: null,
      bookGenre: null,
      bookAuthor: null,
      bookStatus: null,
      bookDesc: null,
      bookCover: null,
      file: null,
    };

    if (!Store('login') && !Store('adminLogin') && !Store('pin')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  changeGenre = (e) => {
    this.setState({ bookGenre: e });
  };

  changeAuthor = (e) => {
    this.setState({ bookAuthor: e });
  };

  changeStatus = (e) => {
    this.setState({ bookStatus: e });
  };

  onDrop = (event) => {
    if (event[0]) {
      this.setState({
        bookCover: URL.createObjectURL(event[0]),
        file: event[0],
      });
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      this.props.postBook({ data: this.state, apikey: Store('apikey') });
      Swal.fire({
        title: 'Add New Book success',
        text: '',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Add New Book failed',
        text: '',
        icon: 'error',
      });
    }
  };

  componentDidMount = async () => {
    await this.props.fetchGenre();
    await this.props.fetchAuthor();
    this.setState({
      genres: this.props.genres.result,
      authors: this.props.authors.result,
    });
  };

  render() {
    const { bookCover, genres, authors } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        <section>
          <Container>
            <div className="head-title">
              <h2 className="font-weight-bold">New Book</h2>
              <div className="divinder" />
            </div>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col lg={4}>
                  {bookCover ? (
                    <img src={bookCover} className="w-100 h-50" alt={bookCover} />
                  ) : null}
                  <ImageUploader
                    withIcon
                    singleImage
                    buttonText="Choose images"
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                  />
                </Col>
                <Col lg={8}>
                  <Form.Group controlId="bookName">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => this.setState({ bookName: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="bookLanguage">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => this.setState({ bookLanguage: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="bookDate">
                    <Form.Label>Publish Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => this.setState({ bookPublished: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="bookGenre">
                    <Form.Label>Genre</Form.Label>
                    <Select
                      onChange={this.changeGenre}
                      options={genres.map((val) => ({
                        value: val.id,
                        label: val.name,
                      }))}
                    />
                  </Form.Group>
                  <Form.Group controlId="bookAuthor">
                    <Form.Label>Author</Form.Label>
                    <Select
                      onChange={this.changeAuthor}
                      options={authors.map((val) => ({
                        value: val.id,
                        label: val.name,
                      }))}
                    />
                  </Form.Group>
                  <Form.Group controlId="bookAuthor">
                    <Form.Label>Status</Form.Label>
                    <Select
                      onChange={this.changeStatus}
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
                      onChange={(e) => this.setState({ bookDesc: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Button className="mb-3 w-25 ml-auto" type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  genres: state.genres,
  authors: state.authors,
});

const mapDispatchToProps = { postBook, fetchGenre, fetchAuthor };

export default connect(mapStateToProps, mapDispatchToProps)(newBook);
