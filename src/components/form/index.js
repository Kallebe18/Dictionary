import React, { Component } from 'react';
import './styles.css';

import axios from 'axios';

export default class Box extends Component {
  constructor(props){
    super(props);
    this.state = {
      definitions: [],
      definition: '',
      current_def: 0,
      word: '',
      last: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  async makeRequest(){
    let { word } = this.state;
    word = word.toLowerCase()
    if(this.state.word !== '' && word.toLowerCase() !== this.state.last){
      await axios({
        url: `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${this.state.word}`,
        method: "GET",
        headers: {
          "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
          "x-rapidapi-key": "878733d0b0mshe61a208378f26ebp10002cjsned46fd5a55f8"
        }
      })
      .then((res) => {
        // list of objects coming from results with definitions
        let res_l = res.data.list;
        // copying the definitions from each object to another list
        let definitions = [];
        for(let i=0; i<res_l.length; i++){
          definitions.push(res_l[i].definition);
        }
        // setting the state of the actual definitions
        this.setState({
          definitions: definitions,
          definition: res.data.list[0].definition,
          current_def: 0,
          last: word,
        })
      })
      .catch((err) => console.log(err));
    }
  }

  handleChange(event){
    this.setState({
      word: event.target.value,
    })
  }

  nextPage = () => {
    const { definitions, current_def } = this.state;
    let next = current_def + 1;
    let definition = definitions[next];
    if(current_def < definitions.length){
      this.setState({
        definition,
        current_def: next,
      });
    }
  }

  prevPage = () => {
    const { definitions, current_def } = this.state;
    let next = current_def - 1;
    let definition = definitions[next];
    if(current_def > 0){
      this.setState({
        definition,
        current_def: next,
      });
    }
  }

  delDef = () => {
    this.setState({
      definitions: [],
      definition: '',
      word: '',
      last: '',
    });
  }

  addFav = () => {
    var { word, definition } = this.state;
    var favs = JSON.parse(window.localStorage.getItem('favorites'));
    var words = JSON.parse(window.localStorage.getItem('words'));
    word = word.toLowerCase();
    if(!words.includes(word)){
      this.delDef();
      if(!favs){
        favs = [];
        words = [];
      }
      favs.push(definition);
      words.push(word);
      window.localStorage.setItem('favorites', JSON.stringify(favs));
      window.localStorage.setItem('words', JSON.stringify(words));
      this.props.updateFavs();
    } else {
      alert('O termo já foi adicionado como favorito!');
    }
    this.setState({
      last: '',
    });
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.makeRequest();
    }
  }

  render(){
    const { word, definition, current_def } = this.state;
    let nav;
    if(definition !== ''){
      nav = (
      <div>
        <p id="definition">{this.state.definition}</p>
        <div id="nav">
          <button 
            disabled = {current_def === 0}
            className = "nav-but noselect"
            onClick = {this.prevPage}>BACK</button>
          <div className="animate" id="close" onClick={this.delDef}></div>
          <div className="animate" id="fav" onClick={this.addFav}></div>
          <button 
            disabled = {current_def === 9} 
            className = "nav-but noselect" 
            onClick = {this.nextPage}>NEXT</button>
        </div>
      </div>
      );
    } else {
      nav = <div id="definition">there's no definitions here &nbsp;:(&nbsp;</div>;
    }

    return(
      <section id="box">
        <p id="title">Type a word to search</p>
        <input type="text" spellCheck="false" value={word} name="word" 
        onKeyPress={this.handleKeyPress} onChange={this.handleChange}/>
        <input type="submit" value="Search" onClick={this.makeRequest}/>
        {nav}
      </section>
    );
  }
}