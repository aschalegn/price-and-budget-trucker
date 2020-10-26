import React from 'react';
import { images } from "./sliderIMages";
import { Carousel } from "react-bootstrap"
import "./imageslider.css";
export default function HeaderBeforeLogin() {

    return (
        <section className="HeaderBeforeLogin">
            <Carousel>
                {images.map((image, i) =>
                    <Carousel.Item className="carousale_item" key={i}>
                        <img src={image.image} alt='childer education' className="d-block w-100"/>
                        <Carousel.Caption>
                            <h1>{image.text}</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </section>
    );
}
