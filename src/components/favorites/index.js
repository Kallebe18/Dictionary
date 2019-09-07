import React, { Component } from 'react';
import './styles.css';

export default class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_fav: 0
    }
  }

  componentDidMount(){
    const {favs, words} = this.props;
    if(favs){
      this.setState({
        fav: favs[0],
        word: words[0]
      })
    }
  }

  prevFav = () => {
    const { current_fav } = this.state;
    if(current_fav-1 > -1){
      let next = current_fav - 1;
      this.setState({
        current_fav: next,
      });
    }
  }

  nextFav = () => {
    const {favs} = this.props;
    const {current_fav } = this.state;  
    if(current_fav+1 < favs.length){
      let next = current_fav + 1;
      this.setState({
        current_fav: next,
      });
    }
  }

  delFav = () => {
    let { favs, words } = this.props;
    const { current_fav } = this.state;
    favs = favs.filter((ele)=>ele!==favs[current_fav]);
    words = words.filter((ele)=>ele!==words[current_fav]);
    window.localStorage.setItem('favorites', JSON.stringify(favs));
    window.localStorage.setItem('words', JSON.stringify(words));
    this.props.updateFavs();
    this.setState({
      current_fav: 0,
    })
  }

  render(){
    const {favs, words} = this.props;
    const {current_fav} = this.state;
    let nav;
    if(favs){
      if(favs.length > 0){
        nav = (
          <div>
            <h2 id="word">{words && words[current_fav]}</h2>
            <p id="favorite">{favs && favs[current_fav]}</p>
            <div id="nav2">
              <button 
                disabled = {current_fav === 0}
                className = "nav-but noselect"
                onClick = {this.prevFav}>BACK</button>
              <div className="animate" id="close" onClick={this.delFav}></div>
              <button 
                disabled = {current_fav === favs.length-1} 
                className = "nav-but noselect" 
                onClick = {this.nextFav}>NEXT</button>
            </div>
          </div>
        );
      } else {
        nav = <div id="definition">
        You have no favorite definitions &nbsp;:(&nbsp;</div>;
      }
    } else {
      nav = <div id="definition">You don't have favorite definitions &nbsp;:(&nbsp;</div>;
    }
    return(
      <aside>
        <h1>Your favorite definitions</h1>
        {nav}
      </aside>
    );
  }
}