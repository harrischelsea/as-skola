import React, { Component } from 'react';
import * as firebase from "firebase";
import { Container, Image, Grid } from 'semantic-ui-react';
import './Home.css';
import ArticleList from '../article-list/ArticleList';
import Menu from '../../components/menu/Menu';
import Notification from '../../components/notification/Notification';
import Slider from '../../components/slider/Slider';
import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import moment from 'moment'
moment.locale('bs');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            clanci: [],
            obavjestenja: [],
            loading: true,
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
        firebase.database().ref('clanci/').on('value', snapshot => {
          console.log('ovdje');
          console.log(snapshot.val());
          this.setState({
            clanci: snapshot.val()
          });
        });

        firebase.database().ref('obavjestenja/').on('value', snapshot => {
            console.log('ovdje');
            console.log(snapshot.val());
            this.setState({
              obavjestenja: snapshot.val(),
              loading: false,
            });
          });
      }

    async componentDidMount() {
        const frb = await this.frbInit();
        const read = await this.readData();
    }

  render() {
      if (this.state.loading) return <Loading />
    return (
    <div className="bgr">
    <Menu />

        <Container>
        <Slider clanci={this.state.clanci} />

        <Grid>
          <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Notification obavjestenja={this.state.obavjestenja} />

            <Link to="/cms">cms</Link>
          </Grid.Column>
          
          <Grid.Column mobile={16} tablet={8} computer={12}>
            <ArticleList clanci={this.state.clanci} />
          </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
    </div>
    )
  }
}
