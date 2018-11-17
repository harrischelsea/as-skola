import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import { Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state={
            clanci: []
        }
    }

    componentDidMount() {
        let slider = this.props.clanci.slice(0, 3);
        this.setState({ clanci: slider })
    }

  render() {
    return (
        <div className="slider-bgr" align="center">
        <Carousel
                autoplayInterval={"4000"}
                autoplay={true}
                style={{width: '95%', height: window.innerWidth > 600 ? '400px' : 'auto' }}
                wrapAround={true}
                // initialSlideHeight={100}
                heightMode="first"
            >
            {
                this.state.clanci && this.state.clanci.map(el => 
                    <div className="carousel-item">
                        <Link to={'/article/' + el.id}
                        style={{
                            height: window.innerWidth > 600 ? '400px' : 'auto', 
                            width: window.innerWidth > 600 ? '60%' : '100%'
                          }} 
                        >
                        <Image className="carousel-image" 
                          style={{
                              width: '100%',
                              height: window.innerWidth > 600 ? '400px' : 'auto', 
                            }} 
                          src={el.slika} />
                        </Link>
                        <div className="carousel-title">
                        <h1>{el.naslov}</h1>
                        <p>{el.tekst.substring(0, 100) + "..."}</p>
                        <Button basic><Link to={'/article/' + el.id}>Pročitajte više</Link></Button>
                        </div>
                    </div>
                    
                    )
            }
        </Carousel>
        </div>
    )
  }
}
