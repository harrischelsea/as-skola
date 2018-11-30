import React, { Component } from 'react';
import * as firebase from "firebase";
import 'draft-js/dist/Draft.css';
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
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <label>naslov</label>
            <input
             onChange={ (naslov) => this.setState({naslov: naslov.target.value})}
             type="text" />
            <label>tekst</label>
            <textarea
            onChange={ (tekst) => this.setState({tekst: tekst.target.value})}
            ></textarea>
            <label>autor</label>
            <input 
             onChange={ (autor) => this.setState({autor: autor.target.value})}
             type="text" />

            <input type="file" className="inputfile" id="f" onChange={this.handleselectedFile} />
            <label for="f">Kliknite da dodate sliku</label>
            
            <button onClick={this.handleUpload}>Upload {this.state.loading ? "Sačekajte..." : ""}</button>
            <button onClick={this.insertData}>Dodaj</button>

            <h1>{this.state.imgs.length}</h1>

            <div>
                {
                    this.state.imgs.map(el => 
                        <img src={el} style={{width: '20%', height: 'auto'}} />
                        )
                }
            </div>
      </div>
    )
  }
}
