import React from 'react'
import { Link } from "react-router-dom"
import { Card } from 'react-bootstrap'

export default function Genre(props) {
  return (
    <Link to={{ pathname: `/books/${props.name}`, query: { genreId: props.id } }}>
      <Card className="border-0 bg-transparent animate__animated animate__fadeInUp">
        <Card.Img variant="top" src='https://source.unsplash.com/WEQbe2jBg40/600x1200' className="rounded mx-auto genre-cover" />
        <p className="stretched-link text-center font-weight-bold genre-text text-white">{props.name}</p>
      </Card>
    </Link>
  )
}
