import $ from 'jquery';
import AbstractComponent from '../../abstract/AbstractComponent';
import React from 'react';

class FormInput extends AbstractComponent {

  constructor(props) {
    super(props);
    this.setInputRef = this.setInputRef.bind(this);
    this.serialize = this.serialize.bind(this);
    this.onMobile = this.onMobile.bind(this);
    this.showInvalid = this.showInvalid.bind(this);
    this.addInvalidBorder = this.addInvalidBorder.bind(this);
    this.addInvalidShadow = this.addInvalidShadow.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.clear = this.clear.bind(this);
    this.getInputEl = this.getInputEl.bind(this);
  }

  setInputRef(ref) {
    this.input = ref;
  }

  isValid() {
    var isValid = true;

    if (this.props.required && !this.serialize()) {
      isValid = false;
      this.showInvalid();
    }

    return isValid;
  }

  serialize() {
    return $(this.input).val().trim();
  }

  onMobile() {
    return window.innerWidth < this.MOBILE_THRESH;
  }

  // display the input as invalid
  showInvalid() {
    this.onMobile() && !this.props.useTextarea ? this.addInvalidBorder() : this.addInvalidShadow();
  }
  
  addInvalidBorder() {
    $(this.input).addClass('invalid-border');
  }
  
  addInvalidShadow() {
    $(this.input).addClass('invalid-shadow');
  }

  // remove any invalid display of the input field when user begins typing again
  onKeyUp() {
    $(this.input).removeClass('invalid-border invalid-shadow');

    // bubble this up if necessary
    if (this.props.onKeyUp) {
      this.props.onKeyUp(this.serialize());
    }
  }

  // accounting for any desired class names that were passed down
  getClassNames() {
    var classes = this.props.classes || [];
    classes.unshift('form-input');  // we want form-input to be 1st
    return classes.join(' ');
  }

  // empty the input
  clear() {
    $(this.input).val('');
  }

  getInputEl() {
    var name = this.props.name || '';
    var placeholder = this.props.placeholder || '';
    var defaultValue = this.props.defaultValue || '';
    var classes = this.getClassNames();

    return this.props.useTextarea ?
      <textarea className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}></textarea> :
      <input type="text" className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>;
  }

  render() {
    return this.getInputEl();
  }

}

export default FormInput;