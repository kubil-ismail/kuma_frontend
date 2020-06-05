import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import profile from '../assets/img/profil.png'

export default function Sidebar() {
  return (
    <ListGroup className="sidebar shadow">
      <div className="d-flex justify-content-center mt-5">
        <img src={profile} className="w-50" />
      </div>
      <h4 className="mt-3 mb-5 text-center font-weight-bold">Yui Hirasawa</h4>
      <ListGroupItem className="border-0">Cras justo odio</ListGroupItem>
      <ListGroupItem className="border-0">Dapibus ac facilisis in</ListGroupItem>
      <ListGroupItem className="border-0">Morbi leo risus</ListGroupItem>
    </ListGroup>
  )
}
