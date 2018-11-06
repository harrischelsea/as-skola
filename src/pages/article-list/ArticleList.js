import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

export default class ArticleList extends Component {
  render() {
    return (
      <div>
        <div className="articles">
                {
                    this.props.clanci && this.props.clanci.map( (el, i) =>
                            <div key={i} className="article">
                            <Image src={el.slika} style={{width: '100%'}} />
                            <h1>{el.naslov}</h1>
                            <p>{el.tekst.substring(0, 250) + "..."}</p>
                            <div className="datetime">
                                <font>{el.autor}</font>
                                <font>{el.vrijeme}</font>
                            </div>
                        </div>
                    )
                }
            </div>
      </div>
    )
  }
}