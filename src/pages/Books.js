/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { get } from '../services';

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
      options: [],
      error: false,
      sort: 1,
    };
  }

  getAllBooks = async () => {
    try {
      const books = await get({ url: 'book?limit=8' });
      const { data, options } = books.data;
      this.setState({
        books: data,
        options,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  onSort = (sort) => {
    const { books } = this.state;
    if (parseInt(sort, 10) === 2) {
      // DESC
      books.sort((a, b) => {
        return a - b;
      });
      this.setState({ books, sort: 2 });
    } else {
      // ASC
      books.sort((a, b) => {
        return a - b;
      });
      this.setState({ books, sort: 1 });
    }
  };

  handlePageChange = async (page) => {
    try {
      const books = await get({ url: `book?limit=8&page=${page}` });
      const { data, options } = books.data;
      this.setState({
        books: data,
        options,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  render() {
    const { books, options, error, sort } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        {/* Popular Book */}
        <section>
          <Container className="my-5">
            <div className="d-flex justify-content-between">
              <div className="head-title">
                <h3 className="main-title font-weight-bold">List Book</h3>
                <div className="divinder w-50" />
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item active={sort === 1} onClick={() => this.onSort('1')}>
                    Sort by name A - Z
                  </Dropdown.Item>
                  <Dropdown.Item active={sort === 2} onClick={() => this.onSort('2')}>
                    Sort by name Z - A
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Show if failed fetch */}
            {error ? <Alert message="Can't get book from server" /> : null}

            {/* Fetch books */}
            {!books.length ? (
              <BookLoader />
            ) : (
              <>
                <Row>
                  {books.map((val) => (
                    <Col className="mb-5" lg={3} md={6} xs={6} key={val.id}>
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
