import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function Cards(props) {
  return (
    <Card className="shadow">
      <CardImg top width="100%" src={`http://localhost:8000/${props.cover}`} alt={props.title} />
      <CardBody>
        <CardTitle className="text-center font-weight-bold text-truncate">{props.title}</CardTitle>
        <CardText className="text-justify desc">{props.desc}</CardText>
      </CardBody>
      <Link to={{ pathname: '/detail', query: { id: props.id } }} className="stretched-link"/>
    </Card>
  )
}
