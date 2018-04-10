import React, { Component } from 'react';
import './App.css'; //imports stylesheets
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';  //imports the profile component

class App extends Component {

  //constructor of component
  constructor(props) {
    super(props);
    this.state = {
      query: '',  //this is what the user types
      artist: null,  //need to set arist state as null
      tracks: [],  //initialize tracks to an empty array
      imageUrl: ''  //this is the url of the image to retrieve
    }
  }

  search() {
    console.log('this.state', this.state.query);  //this logs this.state for testing
    //const BASE_URL = 'https://accounts.spotify.com/authorize?'; // this sets the base URL to use for web requests.  The tailing '?' is important to recognize that this is a query
    const BASE_URL = 'https://itunes.apple.com/search?'; // this sets the base URL to use for web requests.  The tailing '?' is important to recognize that this is a query
    //const FETCH_URL = BASE_URL + 'term=' + this.state.query
    //                  + '&limit=1';  //this sets the itunes query to search for

    //can use backticks to wrap the FETCHURL string
    let FETCH_URL = `${BASE_URL}term=${this.state.query}&entity=musicArtist&limit=1`;  //this sets the itunes query to search for
    console.log('FETCH_URL', FETCH_URL);  //logs query url to output

    //get the tracks using the itunes lookup
    const TRACK_URL = `https://itunes.apple.com/lookup?`;  //this sets the itunes query to search for

    //fetch method returns a promise that something that may or may not eventually return
    //we check for promise in callback function which is created as an anonymous function
    //this works since we are only retrieving one result
    //we can determine that if there are no results, we do nothing
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
        const artist = json.results[0];
        console.log('artist',artist);
        this.setState({artist});  //this will set the artist in the state field
        //console.log('state',this.state);

        //get the top tracks for that artist using the artist id
        //we will will set the artist.image to the top track result
        FETCH_URL = `${TRACK_URL}id=${artist.artistId}&entity=song&limit=10`;
        fetch(FETCH_URL, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
          //console.log('artists tracks',json);
          const tracks = json.results.slice(1);

          //use the first artwork image as url
          const imageUrl = tracks[0].artworkUrl100;

          //console.log('tracks',tracks);
          this.setState({tracks, imageUrl});
          console.log('state',this.state);
        })
    })
    .catch((err) =>{
        console.log(err);
    });
  }

  render() {
      //console.log('state',this.state);
      // returns the render

      //create title
      //create placeholder box to search for an artist
      //then add a submit button

      //use form group to create boostrap forms and use control to create specific fields
      //we use input group because we want the button to be more extensive than a regular button
        //this this adds a glyp icon of a magnifying glass to the input icon
        //we use an onchange function to update the value of query as events occur
        //use onChange to change value of query every time the input box is modified
        //'event.key' is the result of the an keys typed in the input box
        //can use anonymous classes within code as done with event.key

      //we can use imported Profile component
        //you can add props to the profile component
      //we will send the track image url to be a placeholder for the artist image
      return (
        <div className="App">
          <div className="App-title">Music Master</div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search for an Artist"
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                  if(event.key === 'Enter') {
                    this.search();
                  }
                }}
              />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <Profile
            artist={this.state.artist}
            imageUrl={this.state.imageUrl}
          />
          <div className="Gallery">
            Gallery
          </div>
        </div>

      );
  }
}

//need to export to make it available
export default App;
