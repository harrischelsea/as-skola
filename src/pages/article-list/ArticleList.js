import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/bs';
moment.locale('bs');

export default class ArticleList extends Component {
  render() {
    return (
      <div>
        <div className="articles">
                {
                    this.props.clanci && this.props.clanci.map( (el, i) =>
                            <Link to={'/article/' + el.id} key={i} className="article">
                            <Image src={el.slika} style={{width: '100%', height: '60%'}} />
                            <h1>{el.naslov}</h1>
                            <p>{el.tekst.substring(0, 250) + "..."}</p>
                            <div className="datetime">
                                <font>{el.autor}</font>
                                <font>{moment(el.vrijeme).format('L')}</font>
                            </div>
                            
                            </Link>
                    )
                }
            </div>
      </div>
    )
  }
}
