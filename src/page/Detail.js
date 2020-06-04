import React, { Component, Fragment } from 'react'
import '../assets/sass/page/detail.scss'
import cover from '../assets/img/covernya_dilan.png'
import banner from '../assets/img/covernya.png'

export default class Detail extends Component {
  render() {
    return (
      <Fragment>
        <div className="details">
          <div className="half-cover">
            <img src={banner} alt="half-cover"/>
          </div>
            <div className="full-cover">
              <img src={cover} alt="full-cover"/>
            </div>
            <div className="book-details">
              <div className="tag">
                <div className="text">Novel</div>
              </div>
              <div className="info">
                <div className="title">DILAN 1990</div>
                <div className="status">Available</div>
              </div>
              <div className="date">30 Juni 2019</div>
              <div className="desc">
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
                </div>
                <div className="borrow">
                  <button>Borrow</button>
                </div>
              </div>
            </div>
          </div>
      </Fragment>
    )
  }
}
