import React, { Component } from 'react';
import * as firebase from "firebase";

export default class Cms extends Component {
constructor(props) {
    super(props);
    this.state={
        naslov: '',
        tekst: '',
        autor: '',
        downloadURL: '',
        selectedFile: null
    }
}

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
    const uploadTask = firebase.storage().ref('images/' + selectedFile.name).put(selectedFile);
    await uploadTask.then(function(snapshot) {
        console.log('snap', snapshot);
        console.log('Uploaded a blob or file!');
      });

    await firebase.storage().ref('images/' + selectedFile.name).getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        this.setState({ downloadURL });
        });
}

insertData = () => {
    const { naslov, tekst, autor, downloadURL } = this.state;
    let key = firebase.database().ref('clanci').push().key;

    console.log('kkkkkkeeeeeeeyyyyy', key);

    firebase.database().ref('clanci/' + key).set({
        id: key,
        naslov,
        tekst,
        vrijeme: String( new Date() ),
        autor,
        slika: downloadURL
      });
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
            <input type="file" name="" id="" onChange={this.handleselectedFile} />
            <button onClick={this.handleUpload}>Upload</button>
            <button onClick={this.insertData}>Dodaj</button>
      </div>
    )
  }
}
