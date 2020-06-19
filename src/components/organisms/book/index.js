/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export default function index(props) {
  return (
    <Card className="border-0 bg-transparent">
      <Card.Img
        variant="top"
        src={props.cover}
        className="rounded mx-auto card-cover"
        alt="cover"
      />
      <Card.Body className="px-0">
        <Card.Title className="font-weight-bold text-truncate">
          {props.title || 'unknown'}
        </Card.Title>
        <Card.Text>{props.author || 'unknown'}</Card.Text>
        <Badge pill variant="primary mr-2 py-2 px-2">
          {props.genre || 'unknown'}
        </Badge>
        <Badge pill variant="dark py-2 px-2">
          {props.language || 'unknown'}
        </Badge>
      </Card.Body>
    </Card>
  );
}
