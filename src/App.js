import React, { Component } from 'react';
import './styles.css';

import Header from './components/main/index';
import Box from './components/form/index';
import Favorites from './components/favorites/index';
import Footer from './components/footer/index';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      favorites: JSON.parse(window.localStorage.getItem('favorites')),
      words: JSON.parse(window.localStorage.getItem('words'))
    }
  }

  componentDidMount(){
    let favs = [];
    let words = [];
    window.localStorage.setItem('favorites', JSON.stringify(favs));
    window.localStorage.setItem('words', JSON.stringify(words));
  }

  updateFavs = () => {
    this.setState({
      favorites: JSON.parse(window.localStorage.getItem('favorites')),
      words: JSON.parse(window.localStorage.getItem('words'))
    })
  }

  render(){
    return (
      <div id="app">
        <div id="content">
          <Header/>
          <div id="container">
            <Box updateFavs={this.updateFavs}/>
            <Favorites updateFavs={this.updateFavs} favs={this.state.favorites} words={this.state.words}/>
          </div>
        </div>
        <Footer id="footer"/>
      </div>
    );
  }
}

export default App;
