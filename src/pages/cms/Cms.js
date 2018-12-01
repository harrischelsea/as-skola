import React, { Component } from 'react';
import * as firebase from "firebase";
import { Container } from 'semantic-ui-react';
import './Cms.css';

export default class Cms extends Component {
constructor(props) {
    super(props);
    this.state={
        naslov: '',
        tekst: '',
        autor: '',
        downloadURL: '',
        selectedFile: null,
        
        imgs: [],
        loading: false
    }
    
}

onChange = (editorState) => this.setState({editorState});

handleselectedFile = event => {
    console.log('eeeevvvvv', event.target.files[0]);
    const image = event.target.files[0];
    this.setState({
    selectedFile: event.target.files[0],
    loaded: 0,
    })
}

handleUpload = async () => {
    const { selectedFile } = this.state;
    this.setState({loading: true})

    const uploadTask = firebase.storage().ref('images/' + selectedFile.name).put(selectedFile);
    await uploadTask.then(function(snapshot) {
        console.log('snap', snapshot);
        console.log('Uploaded a blob or file!');
      });

    await firebase.storage().ref('images/' + selectedFile.name).getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        this.setState({ 
            downloadURL,
            imgs: [downloadURL, ...this.state.imgs],
            selectedFile: null,
            loading: false
         });
        });
}

insertData = () => {
    const { naslov, tekst, autor, downloadURL } = this.state;
    let key = firebase.database().ref('clanci').push().key;

    firebase.database().ref('clanci/' + key).set({
        id: key,
        naslov,
        tekst,
        vrijeme: String( new Date() ),
        autor,
        slika: this.state.imgs[0],
        galerija: this.state.imgs
      });

      window.location.href = "/"; 
}

  render() {
    return (
    <Container>
      <div className="cms-bgr">
            <div className="cms-input">
                <label>Naslov</label>
                <input
                    placeholder="Unesite naslov..."
                    onChange={ (naslov) => this.setState({naslov: naslov.target.value})}
                    type="text" />
                <label>Tekst</label>
                <textarea
                    placeholder="Unesite tekst..."
                    onChange={ (tekst) => this.setState({tekst: tekst.target.value})}
                    ></textarea>
                <label>Autor</label>
                <input 
                    placeholder="Unesite autora.."
                    onChange={ (autor) => this.setState({autor: autor.target.value})}
                    type="text" />
            </div>

            <div className="add-images">
                <div className="upload-img">
                    <input 
                        type="file" 
                        className="inputfile" 
                        id="f" 
                        onChange={this.handleselectedFile} />
                    <label for="f">Kliknite da dodate sliku</label>
                    <h1 onClick={this.handleUpload}> + {this.state.loading ? " (Sačekajte...)" : ""}</h1>
                </div>
    
                <h1>{this.state.imgs.length}</h1>
                <div>
                    {
                        this.state.imgs.map(el => 
                            <img src={el} style={{width: '20%', height: 'auto'}} />
                            )
                    }
                </div>
            </div>
      </div>

      <button className="add-article" onClick={this.insertData}>Dodaj</button>

    </Container>
    )
  }
}
