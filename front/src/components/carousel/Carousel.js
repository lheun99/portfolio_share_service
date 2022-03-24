import React from "react";
import Slider from "react-slick";
import "./carousel.css";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className=".carousel_container" style={{backgroundColor:'#419be0', padding:40}}>
      <Slider {...settings}>
        <div>
          <img src={require('./info1.PNG')} />
        </div>
        <div>
        <img src={require('./info2.PNG')} />
        </div>
        <div>
          <img src={require('./info3.PNG')} />
        </div>
        <div>
          <img src={require('./info4.PNG')} />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel