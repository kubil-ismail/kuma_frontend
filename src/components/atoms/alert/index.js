/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from 'react-bootstrap';

export default function index(props) {
  return <Alert variant={props.variant || 'danger'}>{props.message || '-'}</Alert>;
}
