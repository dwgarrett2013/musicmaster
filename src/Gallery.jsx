//This gallery will hold the tracks that are used

import React, { Component } from 'react';
import './App.css'; //import the css

class Gallery extends Component {

  //we are adding state to this component to store the url of the currently playing song
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '', //url that is currently playing
      audio: null,  //track of currently in state?
      playing: false  //is something playing?
    }
  }

  //this is a helper method that allows us to play preview audio
  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);

    //if there is currently nothing playing, then we want to play
    if(!this.state.playing) {
      //start playing audio
      audio.play();

      this.setState({
        playing: true,          //set playing to true
        playingUrl: previewUrl, //set the playing URL equal to the value that is passed in
        audio   //set the updated audio feed
      })
    }
    else {
      //if the playingUrl is equal to the previewUrl, then we should pause/start the audito
      if(this.state.playingUrl===previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      }

      //otherwise, we are stopping the current audio, then playing the newly selected audio
      //we need to update the state accordingly
      else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playingUrl: previewUrl,
          playing: true,
          audio
        })
      }
    }
  }

  //this is what renders every time, it executes in order
  //to render the tracks, we need to use the map function to iterate over it
  //we can add preview url by finding soundfile
  render() {
    const {tracks}=this.props;  //set tracks that are coming in as porpse
    return (
      <div>
        {tracks.map((track, k) => {
          //console.log('track',track);
          const trackImg=track.artworkUrl100; //iterate over each element as a "track", k represents index
          const trackName=track.trackName; //get the name of the track
          //BIG NOTE, YOU NEED TO RETURN THE JSX IN THE MAP FUNCTION SINCE IT IS UNDER A DIFFERENT SCOPE!!!!
          //the onclick track div tag will invoke the playAudio() function whenever a track is clicked
            //we can also add functionality to pause and switch songs
          //adding animation to the device using track-play headder
            //creates the triangle
          return (
            <div
              key={k}
              className="track"
              onClick={() => this.playAudio(track.previewUrl)}
            >
              <img
                src={trackImg}
                className="track-img"
                alt="track"
              />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    //use a turnary expression to see if playing and give the correct button
                    //EXPALINS THIS LOGIC
                    this.state.playingUrl === track.previewUrl
                      ? <span>| |</span>
                      : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className="track-text">
                  {trackName}
              </p>
            </div>

          )
        })}
      </div>
    )
  }
}

export default Gallery;
