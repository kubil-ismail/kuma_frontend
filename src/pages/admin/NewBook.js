/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Store from 'store2';
import Swal from 'sweetalert2';
import Select from 'react-select';
import ImageUploader from 'react-images-upload';

import { get, addBook } from '../../services';

import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

export default class newBook extends Component {
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
    this.setState({
      bookCover: URL.createObjectURL(event[0]),
      file: event[0],
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBook(this.state, Store('apikey'));
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
    const genre = await get({ url: 'genre' });
    const author = await get({ url: 'author' });
    this.setState({
      genres: genre.data.data,
      authors: author.data.data,
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
