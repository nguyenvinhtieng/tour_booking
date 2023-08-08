import React, { Component } from 'react'
import Slider from "react-slick";
let images = [
    { id: 1, src: "https://picsum.photos/800/300/?random" },
    { id: 2, src: "https://picsum.photos/800/300/?random" },
    { id: 3, src: "https://picsum.photos/800/300/?random" },
]

export default class SlideShow extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <div className='slide-container-custom'>
            <Slider {...settings}>
                <div>
                    <div className='slider-container-main'>
                        <h3 className='slider-text'>Hello</h3>
                        <img src="/images/slider-01.jpg" alt="" />
                    </div>
                </div>
                <div>
                    <div className='slider-container-main'>
                        <h3 className='slider-text'>Hello</h3>
                        <img src="/images/slider-02.jpg" alt="" />
                    </div>
                </div>
                <div>
                    <div className='slider-container-main'>
                        <h3 className='slider-text'>Hello</h3>
                        <img src="/images/slider-03.jpg" alt="" />
                    </div>
                </div>
            </Slider>
        </div>
      );
    }
  }