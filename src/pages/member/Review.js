/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Store from 'store2';
import Swal from 'sweetalert2';
import { Container, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { get, remove } from '../../services';

import icon from '../../assets/img/icon.png';

// Component
import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: null,
      email: null,
      review: [],
      options: [],
      error: false,
    };
  }

  componentDidMount() {
    this.getProfile();
    this.getReview();
  }

  getProfile = async () => {
    try {
      const profile = await get({
        url: `profile/${Store('userId')}`,
        body: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });

      const { data } = profile.data;
      this.setState({
        fullname: data[0].fullname,
        email: data[0].email,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  getReview = async () => {
    try {
      const review = await get({
        url: 'review?limit=5',
        body: {
          params: {
            userId: Store('userId'),
          },
        },
      });

      const { data, options } = review.data;
      this.setState({ review: data, options });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  handlePageChange = async (page) => {
    try {
      const review = await get({
        url: `review?limit=5`,
        body: {
          params: {
            userId: Store('userId'),
            page,
          },
        },
      });
      const { data, options } = review.data;
      this.setState({ review: data, options });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  deleteReview = async (id) => {
    try {
      await remove({
        url: `review/${id}`,
        body: {
          headers: {
            Authorization: Store('apikey'),
          },
        },
      });
      Swal.fire('Delete review success', 'successfully delete review', 'success');
      this.getReview();
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    const { fullname, email, review, options, error } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        <section>
          <Container>
            <div className="profile animate__animated animate__fadeIn mb-5">
              <img
                src={icon}
                className="rounded-circle img-thumbnail d-block mx-auto"
                alt="Profile Name"
              />
              <h2 className="font-weight-bold text-center mt-4">{fullname}</h2>
              <p className="text-center">{email}</p>
            </div>
            <div className="head-title text-center">
              <h3 className="main-title font-weight-bold">Review Book</h3>
              <div className="divinder mx-auto" />
            </div>
            <Row>
              <Col lg={12}>
                {error ? <Alert variant="warning">Review not found</Alert> : null}
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Review</th>
                      <th>Date</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {review.map((val) => (
                      <tr key={val.id}>
                        <td>{val.name}</td>
                        <td>{val.review}</td>
                        <td>{val.created_at.slice(0, 10)}</td>
                        <td>
                          <Button variant="danger" onClick={() => this.deleteReview(val.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}
