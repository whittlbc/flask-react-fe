import React, { Component } from 'react';
import HorizSpinner from './spinners/HorizSpinner';

class LgSpinnerBtn extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  getClasses() {
    var classes = this.props.classes || [];
    classes.unshift('lg-spinner-btn');
    return classes.join(' ');
  }

  render() {
    return (
      <div className={this.getClasses()}>
        <button onClick={this.onClick}>{this.props.btnText}</button>
        <HorizSpinner />
      </div>
    );
  }
}

export default LgSpinnerBtn;