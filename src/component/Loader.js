import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader() {
  return (
    <span className="d-flex">
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="primary" className="mx-2" />
      <Spinner animation="grow" variant="primary" />
    </span>
  )
}
