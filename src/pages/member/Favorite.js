/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Store from 'store2';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { get, remove } from '../../services';

import icon from '../../assets/img/icon.png';

// Component
import Navbar from '../../components/organisms/navbar';
import BookLoader from '../../components/organisms/book/loading';
import Alert from '../../components/atoms/alert';
import Footer from '../../components/organisms/footer';

const url = 'http://localhost:8000/';

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      options: [],
      error: false,
    };
  }

  getFavoriteBook = async () => {
    try {
      const books = await get({
        url: `profile/favorite/${Store('userId')}?limit=12`,
        body: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });
      const { data, options } = books.data;
      this.setState({
        books: data,
        options,
      });
    } catch (error) {
      this.setState({
        error: true,
        books: [],
        options: [],
      });
    }
  };

  handlePageChange = async (page) => {
    try {
      const books = await get({
        url: `profile/favorite/${Store('userId')}?limit=12&page=${page}`,
        body: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });
      const { data, options } = books.data;
      this.setState({
        books: data,
        options,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  deleteBook = async (id) => {
    try {
      await remove({
        url: `favorite/${id}`,
        body: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });
      Swal.fire('Deleted favorites', 'successfully deleted favorites', 'success');
      this.getFavoriteBook();
    } catch (error) {
      this.setState({ error: true });
    }
  };

  componentDidMount = () => {
    this.getFavoriteBook();
  };

  render() {
    const { books, options, error } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        <section>
          <Container>
            <div className="profile mb-5">
              <img
                src={icon}
                className="rounded-circle img-thumbnail d-block mx-auto"
                alt="Profile Name"
              />
              <h2 className="font-weight-bold text-center mt-4">Wik Wik</h2>
              <p className="text-center">sovianbasecamp@gmail.com</p>
            </div>
            <div className="head-title text-center">
              <h3 className="main-title font-weight-bold">Favorite Book</h3>
              <div className="divinder mx-auto" />
            </div>

            {/* Show if failed fetch */}
            {error || !books.length ? (
              <Alert variant="warning" message="Can't get book from server" />
            ) : null}

            {/* Fetch books */}
            {!books.length ? (
              <BookLoader />
            ) : (
              <>
                <Row>
                  {books.map((val) => (
                    <Col lg={3} md={6} xs={6} key={val.book_favorites_id} className="mb-5">
                      <Card className="border-0 bg-transparent">
                        <Link
                          to={{
                            pathname: `/book/${val.name.replace(/\s/g, '-')}`,
                            state: { id: val.id },
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={url + val.cover}
                            className="rounded mx-auto card-cover"
                            alt="cover"
                          />
                        </Link>
                        <Card.Body className="px-0">
                          <Card.Title className="font-weight-bold text-truncate">
                            {val.name || 'unknown'}
                          </Card.Title>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => this.deleteBook(val.book_favorites_id)}
                            block
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Pagination
                  activePage={options.page}
                  itemsCountPerPage={options.perPage}
                  totalItemsCount={parseInt(options.totalData, 10)}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                  hideNavigation
                />
              </>
            )}
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}