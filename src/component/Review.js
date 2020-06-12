import React from 'react'
import { Card } from 'react-bootstrap'

export default function Review(props) {
  return (
    <Card className="m-3 shadow-sm animate__animated animate__fadeInUp">
      <Card.Body>
        <blockquote className="blockquote mb-0">
        </blockquote>
          <p>{props.review}</p>
          <footer className="blockquote-footer">
            {props.user}<cite title="Source Title"> on {props.date.slice(0,10)}</cite>
          </footer>
      </Card.Body>
    </Card>
  )
}
