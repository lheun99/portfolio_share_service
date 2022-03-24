import React, { useContext } from "react";
import Slider from "react-slick";
import "./carousel.css";
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { UserStateContext } from "../../App";

function Carousel() {

  const userState = useContext(UserStateContext);
  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      {isLogin && (<div style={{height:110}}></div>)}
      <Container fluid className="first_container">
        <div className="carousel_container" style={{padding:40, width:"100%", height:650, display:"flex",flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
          <Slider {...settings} style={{width:"100%", height:600,display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
            <div className="image">
              <img width="1000px" height="550px" src={require('./info1.PNG')} />
            </div>
            <div className="image">
            <img width="1000px" height="550px" src={require('./info2.PNG')} />
            </div>
            <div className="image">
              <img width="1000px" height="550px" src={require('./info3.PNG')} />
            </div>
            <div className="image">
              <img width="1000px" height="550px" src={require('./info4.PNG')} />
            </div>
          </Slider>
        </div>
      </Container>
    </>
  );
}

export default Carousel;