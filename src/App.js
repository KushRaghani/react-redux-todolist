import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ItemList extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      hasErrored: false,
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
  }

  fetchData(url) {
    this.setState({
      isLoading: true
    });

    fetch(url)
      .then((response) => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        this.setState({ isLoading: false });
        return response;
      })
      .then((response) => response.json())
      .then((items) => this.setState({ items }))
      .catch(() => this.setState({ hasErrored: true }));
  }

  render() {
    if(this.state.hasErrored) {
      return (
        <p>Sorry! There was an error loading the items</p>
        );
    }

    if(this.state.isLoading) {
      return (
        <p>Loading..</p>
      );
    }

    return (
      <ul>
        { this.state.items.map((item) =>(
          <li key={item.id}>
            {item.label}
          </li>
        ))}
      </ul>
    );
  }
}

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/

export default ItemList;
