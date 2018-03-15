import React, { Component } from 'react';
import './App.css'; //imports stylesheets
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends Component {

  //constructor of component
  constructor(props) {
    super(props);
    this.state = {
      query: ''  //this is what the user types
    }
  }

  search() {
    console.log('this.state', this.state);  //this logs this.state for testing
    const BASE_URL = 'https://accounts.spotify.com/authorize?'; // this sets the base URL to use for web requests.  The tailing '?' is important to recognize that this is a query
    const FETCH_URL= `${BASE_URL}response_type=code&client_id=&scope=user-read-private user-read-email&redirect_uri=http://localhost:3000`
    //const FETCH_URL= `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;  // Forms a URL based on the type of query and force it to be artists.  This uses a template stream instead (you could also use + and +=)
    console.log('FETCH_URL',FETCH_URL);   //log the url for testing

    //use fetch() function to get response from a URL
    //fetch() method returns a Promise that says data will eventually be returned.  but we will need to wait until the callback is made
    //we use the .then() function to log the response when it comes

    let request = require('request'); // "Request" library

    var options = {
          url: FETCH_URL,
          headers: { 'Access-Control-Allow-Origin': '* '},
          json: true
    }
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  };




    /*let reqHeaders=new Headers();
    reqHeaders.set('Access-Control-Allow-Origin', '*');
    reqHeaders.set('Access-Control-Allow-Headers', 'Content-Type');
    reqHeaders.set('Access-Control-Allow-Methods', 'GET');

    let myInit= {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Origin': '*',
        'Boosh': '3'
      }
      //cache: 'default',
      //Content-Type: 'text/plain'
    };
    */



    //let request = new Request(FETCH_URL,myInit);
    //console.log('request',request);
    //console.log('val of header',reqHeaders.get('Access-Control-Allow-Origin'));


    //fetch(request,myInit);.then(response => console.log(response));
    //fetch(request,{
    //  method: 'GET'
    //}).then(response => console.log(response));

  render() {
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
          <div className="Profile">
            <div>Artist Picture</div>
            <div>Artist Name</div>
          </div>
          <div className="Gallery">
            Gallery
          </div>
        </div>

      );
  }
}

//need to export to make it available
export default App;
