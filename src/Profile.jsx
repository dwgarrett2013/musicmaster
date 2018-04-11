//this component will hold the profile for a given artist

import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render() {
    let artist = {name: '', artistLinkUrl: ''};
    let imageUrl = '';
    //we set this value if we have return an artist to the props field
    if(this.props.artist != null) {
      artist=this.props.artist;
    }
    if(this.props.imageUrl != null) {
      imageUrl=this.props.artistImageUrl;
    }
    return(
      <div className="profile">
        <img
          alt="Profile"
          className="profile-img"
          src={imageUrl}
        />
        <div className="profile-info">
          <div className="profile-name">{artist.artistName}</div>
          <div className="profile-link">{artist.artistLinkUrl}</div>
          <div className="profile-genre">{artist.primaryGenreName}</div>
        </div>
      </div>
    )
  }
}

export default Profile;
