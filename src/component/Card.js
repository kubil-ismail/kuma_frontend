import React from 'react'
import '../assets/sass/component/_card.scss'

export default function Card() {
  return (
    <div className="card">
      <div className="card-img">
        <img src="https://via.placeholder.com/640x360" alt=""/>
      </div>
      <div className="card-content">
        <div className="card-title">Lorem ipsum dolor sit amet.</div>
        <div className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, eos?</div>
      </div>
    </div>
  )
}
