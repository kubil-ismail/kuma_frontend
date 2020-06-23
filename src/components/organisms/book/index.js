/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const url = 'http://localhost:8000/';

export default function index(props) {
  return (
    <Card className="border-0 bg-transparent">
      <Link
        to={{ pathname: `/book/${props.title.replace(/\s/g, '-')}`, state: { id: props.id } }}
        className="stretched-link"
      />
      <Card.Img
        variant="top"
        src={url + props.cover}
        className="rounded mx-auto card-cover animate__animated animate__fadeIn"
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
