import React, { Component } from 'react';
import * as firebase from "firebase";

export default class Cms extends Component {
constructor(props) {
    super(props);
    this.state={
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

handleUpload = () => {
    const { selectedFile } = this.state;
    const uploadTask = firebase.storage().ref('images/' + selectedFile.name).put(selectedFile);
    uploadTask.then(function(snapshot) {
        console.log('snap', snapshot);
        console.log('Uploaded a blob or file!');
      });

    firebase.storage().ref('images/' + selectedFile.name).getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        });
}

  render() {
    return (
      <div>
            <input type="file" name="" id="" onChange={this.handleselectedFile} />
            <button onClick={this.handleUpload}>Upload</button>
      </div>
    )
  }
}
