import $ from 'jquery';
import FormInput from './FormInput'
import React from 'react';

class EmailInput extends FormInput {
  
  constructor(props) {
    super(props);
    this.setInvalidMessageRef = this.setInvalidMessageRef.bind(this);
    this.showInvalidEmail = this.showInvalidEmail.bind(this);
    this.showInvalidWithMessage = this.showInvalidWithMessage.bind(this);
    this.hasEmailFormat = this.hasEmailFormat.bind(this);
  }
  
  setInvalidMessageRef(ref) {
    this.invalidMessage = ref;
  }

  isValid() {
    // if not required, it's always valid
    if (!this.props.required) {
      return true;
    }
    
    var value = this.serialize();
    
    // Ensure value is not empty
    if (!value) {
      this.showInvalid();
      return false;
    }
    
    // Ensure value is in proper email format
    if (!this.hasEmailFormat(value)) {
      this.showInvalidEmail();
      return false;
    }
    
    return true;
  }
  
  showInvalidEmail() {
    this.showInvalidWithMessage('Please enter a valid email address');
  }

  showInvalidWithMessage(msg) {
    $(this.invalidMessage).html(msg).show();
    this.addInvalidBorder();
  }
  
  hasEmailFormat(val) {
    return val.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }
  
  onKeyUp() {
    $(this.invalidMessage).hide();
    super.onKeyUp();
  }
  
  render() {
    return (
      <div className="email-input">
        <div className="invalid-message" ref={this.setInvalidMessageRef}></div>
        <input type="text" className={this.getClassNames()} name={this.props.name || ''} placeholder={this.props.placeholder || 'Email'} defaultValue={this.props.defaultValue || ''} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>
      </div>
    );
  }
  
}

export default EmailInput;