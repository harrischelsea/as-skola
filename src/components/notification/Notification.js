import React, { Component } from 'react';
import './Notification.css';

export default class Notification extends Component {
  render() {
    return (
      <div className="notification-bgr">
        <h1>OBAVJEŠTENJA</h1>
        
        <div className="notifications">
            { 
                this.props.obavjestenja && this.props.obavjestenja.map( (el, i) =>
                    <div key={i} className="list-item">
                        <h1>{el.naslov}</h1>
                        <p>{el.tekst && el.tekst}</p>
                    </div>
                )
            }
        </div>

      </div>
    )
  }
}
