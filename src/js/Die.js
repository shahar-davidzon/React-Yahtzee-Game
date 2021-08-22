import React, { Component } from "react";
import "../css/Die.css";

class Die extends Component {
  static defaultProps = {
    numWord: ['one', 'two', 'three', 'four', 'five', 'six'],
    val: 3
  }; 
  render() {
    let classes = `Die fas fa-dice-${this.props.numWord[this.props.val - 1]} `;
    if (this.props.locked) classes += "Die-locked ";
    if (this.props.rolling) classes += "Die-rolling";
    return (
    
      <i
        className={classes}
        onClick={() =>this.props.handleClick(this.props.idx)}
        disabled={this.props.disabled}
      />
    );
  }
}

export default Die;
