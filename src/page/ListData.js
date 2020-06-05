import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Row, Col, Table, Container } from 'reactstrap'

export default class ListData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/')
      .then(res => console.log(res))
  }

  render() {
    const { data } = this.state
    return (
      <Fragment>
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <Container>
              <Table bordered>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 && (
                    <p>Loading...</p>
                  )}
                  {/* {data.map((val, key) => (
                    <tr key={key}>
                      <td>{++key}</td>
                      <td>{val.name}</td>
                      <td>{val.username}</td>
                      <td>{val.email}</td>
                      <td>{val.phone}</td>
                      <td>{val.website}</td>
                    </tr>
                  ))} */}
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
        <Row></Row>
      </Fragment>
    )
  }
}
