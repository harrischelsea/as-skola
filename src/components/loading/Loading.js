import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          marginTop: '10%'
      }}>
        <h1>Loading...</h1>
      </div>
    )
  }
}
