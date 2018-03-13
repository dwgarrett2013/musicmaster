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
  }

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
