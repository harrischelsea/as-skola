import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import { Image, Button } from 'semantic-ui-react';

export default class Slider extends Component {
  render() {
    return (
        <div className="slider-bgr" align="center">
        <Carousel
                autoplayInterval={"4000"}
                autoplay={true}
                style={{width: '95%', height: 'auto'}}
                wrapAround={true}
                // initialSlideHeight={100}
                heightMode="first"
            >
            {
                this.props.clanci && this.props.clanci.map(el => 
                    <div className="carousel-item">
                        <Image className="carousel-image" src={el.slika} size="big" />
                        <div className="carousel-title">
                        <h1>{el.naslov}</h1>
                        <p>{el.tekst.substring(0, 100) + "..."}</p>
                        <Button basic>Pročitajte više</Button>
                        </div>
                    </div>
                    
                    )
            }
        </Carousel>
        </div>
    )
  }
}
