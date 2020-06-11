import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from "react-router-dom"
const url = 'http://localhost:8000/'
export default function Book(props) {
  return (
    <Card className="border-0 bg-transparent animate__animated animate__fadeInUp">
      <Card.Img variant="top" src={`${url}${props.cover}`} className="rounded mx-auto shadow card-cover" />
      <Card.Body className="px-0">
        <Card.Title className="font-weight-bold text-truncate">{props.title}</Card.Title>
        <Card.Text>{props.author}</Card.Text>
        <Badge pill variant="primary mr-2 py-2 px-2">{props.genre}</Badge>
        <Badge pill variant="dark py-2 px-2">{props.language}</Badge>
        <Link to={{ pathname: `/detail/${props.title.replace(/\s/g, '-')}`, query: { id: props.id } }} className="stretched-link" />
      </Card.Body>
    </Card>
  )
}
