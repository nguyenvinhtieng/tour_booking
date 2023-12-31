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
        speed:1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Tự động chuyển ảnh
        autoplaySpeed: 3000, // Thời gian chờ mỗi lần chuyển ảnh (2 giây)
        fade: true, // Thêm hiệu ứng "fade"
        cssEase: "linear", // Thêm hiệu ứng mượt mà
      };
      return (
        <div className='slide-container-custom'>
            <Slider {...settings}>
                <div>
                    <a href="/discount" className='slider-container-main'>
                        <h3 className='slider-text'>Hello</h3>
                        <img src="/images/slider-03.jpg" alt="" />
                    </a>
                </div>
                <div>
                    <a href="/discount" className='slider-container-main'>
                        <h3 className='slider-text'>Hello</h3>
                        <img src="/images/slider-02.jpg" alt="" />
                    </a>
                </div>
                <div>
                    <a href="/discount" className='slider-container-main'>
                        <h3 className='slider-text'>Hello</h3>
                        <img src="/images/slider-01.jpg" alt="" />
                    </a>
                </div>
            </Slider>
        </div>
      );
    }
  }