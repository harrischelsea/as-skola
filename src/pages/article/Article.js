import React, { Component } from 'react';
import * as firebase from "firebase";
import { Container, Image } from 'semantic-ui-react';
import Gallery from 'react-photo-gallery';
import './Article.css';
import moment from 'moment'
moment.locale('bs');


export default class Article extends Component {
constructor(props) {
  super(props);
  this.state={
    article: {},
    id: this.props.match.params.id
  }
}

frbInit = () => {
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAMvd7U_hhyUOQJ-90ZMrj2KAnSwkQjDcs",
      authDomain: "test-ea2c1.firebaseapp.com",
      databaseURL: "https://test-ea2c1.firebaseio.com",
      projectId: "test-ea2c1",
      storageBucket: "test-ea2c1.appspot.com",
      messagingSenderId: "1038478609619"
  };
  
  if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
}

readData = () => {
  console.log('read data');
  const { id } = this.state;
  firebase.database().ref('clanci/' + id).on('value', snapshot => {
    console.log('ovdje');
    console.log(snapshot.val());
    this.setState({ article: snapshot.val() })
  });

}

async componentDidMount() {
  const frb = await this.frbInit();
  const read = await this.readData();
}

  render() {
    const { naslov, tekst, autor, vrijeme, slika, galerija } = this.state.article;
    return (
      <div className="bg">
        <Container>
          <div className="title">
            <div className="info">
              <h1>{naslov}</h1>
              <h4>Autor: {autor}</h4>
              <h4>Datum: {moment(vrijeme).format('L')}</h4>
            </div>
            <Image className="img" src={slika} 
            style={{
              width: window.innerWidth > 900 ? '50%' : '80%', 
              height: '60%'
              }} />
          </div>

          <p className="paragraf">{tekst}</p>

          <div className="gallery">
            <h1>GALERIJA</h1>
            {
              galerija && galerija.map( el =>
                <img src={el} style={{width: '25%', height: 'auto'}} />
              )
            }
          </div>

        </Container> 
      </div>
    )
  }
}
