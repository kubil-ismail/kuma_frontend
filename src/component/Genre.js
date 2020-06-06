import React from 'react'
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap'
// import genreBook from '../assets/img/genre.jpg'

export default function Genre(props) {
  return (
    <Card className="border-0 bg-transparent hvr-grow">
      <Card.Img variant="top" src='https://source.unsplash.com/WEQbe2jBg40/600x1200' className="rounded mx-auto genre-cover" />
      <Link to="/detail" className="stretched-link text-center font-weight-bold genre-text text-white">{props.name}</Link>
    </Card>
  )
}
