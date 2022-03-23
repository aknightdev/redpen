import React, { Component } from 'react';

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    fetch('http://157.230.202.118/api/secret')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }

  render() {
    return (
      <div>
        <h1>Account</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}