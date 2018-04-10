//this component will hold the profile for a given artist

import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render() {
    let artist = {name: '', artistLinkUrl: ''};
    //we set this value if we have return an artist to the props field
    if(this.props.artist != null) {
      artist=this.props.artist;
    }
    return(
      <div>
        <div>{artist.artistName}</div>
        <div>{artist.artistLinkUrl}</div>
        </div>
    )
  }
}

export default Profile;
