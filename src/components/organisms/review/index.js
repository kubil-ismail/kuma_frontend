/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

export default function Review(props) {
  return (
    <Card className="m-3 shadow-sm">
      <Card.Body>
        <blockquote className="blockquote mb-0" />
        <strong>{props.user || 'anonim'}</strong>
        <p>
          Overall Rating : <strong className="ml-1">{props.rating || '-'}</strong>
        </p>
        <p>{props.review || '-'}</p>
      </Card.Body>
    </Card>
  );
}
