import React, { Component, Fragment } from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Badge,
  Button
} from 'reactstrap';
import Axios from 'axios'

import '../assets/sass/page/detail.scss'
import banner from '../assets/img/covernya.png'
import { Redirect } from 'react-router-dom';

export default class Detail extends Component {
  constructor(props) {
    super(props)
    const id = props.location.query ? props.location.query.id : null
    this.state = {
      id: id,
      cover: null,
      title: null,
      desc: null,
      genre: null,
      published: null
    }

  }

  componentDidMount() {
    const { id } = this.state
    if (id) {
      Axios.get(`http://localhost:8000/book/${id}`)
        .then(res => this.setState({
          cover: res.data.data[0].cover,
          title: res.data.data[0].name,
          desc: res.data.data[0].description,
          genre: res.data.data[0].genre,
          published: res.data.data[0].published
        }))
    }
  }

  render() {
    const { id, cover, title, desc, genre, published } = this.state
    
    if (!id) {
      return <Redirect to="/" />
    }
    
    return (
      <Fragment>
        <Navbar className="detail-navbar" color="transparent" dark expand="md">
          <Container>

            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">
                  <Button className="shadow back" color="light">Back</Button>
                </NavLink>
              </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">
                  <Button className="shadow" color="warning">Edit</Button>
                </NavLink>
              </NavItem>
              <NavItem href="/">
                <NavLink href="/">
                  <Button className="shadow" color="danger">Delete</Button>
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>

        <Row className="banner no-gutters">
          <Col lg={12}>
            <img className="w-100 banner-img" style={{ backgroundImage: `url(http://localhost:8000/${cover})`}}/>
          </Col>
        </Row>

        <Container className="mt-5">
          <Row>
            <Col lg={8}>
              <Badge color="warning" className="py-2 px-3 text-white" pill>{genre}</Badge>
              <Row>
                <Col lg={10}>
                  <h1 className="font-weight-bold">{title}</h1>
                </Col>
                <Col lg={2}>
                  <h3 className="text-success font-weight-bold">Available</h3>
                </Col>
              </Row>
              <p className="font-weight-bold">{published}</p>
              <p className="text-justify">{desc}</p>
            </Col>
            <Col lg={{ size: 3, offset: 1 }}>
              <img src={`http://localhost:8000/${cover}`} className="w-100 cover shadow rounded img-thumbnail" />
              <Button className="w-100 text-white shadow borrow" color="warning">Borrow</Button>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}
