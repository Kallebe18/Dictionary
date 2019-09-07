import React, {Component} from 'react';
import './styles.css';

export default class Footer extends Component {
  render(){
    return(
      <footer>
        <div id="copy">
          <h3>&copy; Made by Kallebe Gomes Bezerra 2019</h3>
          <a href="https://github.com/Kallebe18" target="_blank" title="github icon Kallebe18 profile" rel="noopener noreferrer">github icon Kallebe18 profile</a>
        </div>
      </footer>
    );
  }
}