import React from 'react';
import './App.css';
import { TextField, TextareaAutosize, Button } from '@material-ui/core';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = props.onSubmitResponse;
  }

  handleChange(event) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].
    this.setState({value: event.target.value});
  }

  onClick() {
    var res = this.state.value;
    this.onSubmit(res);
  }

  render () {
    return (
      <body className="App-header">
        <p>
          {this.props.question}
        </p>
        <form className="this" noValidate autoComplete="off">
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            multiline={TextareaAutosize}
            value={this.state.value}
            onChange={this.handleChange}/>
        </form>
        <Button onClick={this.onClick}>Next</Button>
      </body>
    )
  }
}

export {Question}
