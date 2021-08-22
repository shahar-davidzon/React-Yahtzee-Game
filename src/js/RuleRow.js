import React, { Component } from 'react';
import '../css/RuleRow.css'

class RuleRow extends Component {
  render() {
    const { score, name, doScore, description} = this.props;
    const disabled = score != undefined;
    return (
      <tr 
      className={`RuleRow RuleRow-${disabled ? 'disabled' : 'active'}`} 
      onClick={disabled ? null : doScore}>
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{disabled ? score : description}</td>
      </tr>
    )
  }
}

export default RuleRow;