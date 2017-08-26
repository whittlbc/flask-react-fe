import { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);

    this.status = {
      STATIC: 0,
      SERIALIZING: 1,
      SENDING: 2,
      COMPLETE: 3
    };

    this.state = {
      status: this.status.STATIC,
      formComps: this.props.formComps
    };

    this.formCompRefs = [];
    this.pushFormCompRef = this.pushFormCompRef.bind(this);
    this.clear = this.clear.bind(this);
    this.serialize = this.serialize.bind(this);
  }

  pushFormCompRef(ref) {
    this.formCompRefs.push(ref);
  }

  formValid() {
    var isValid = true;

    this.formCompRefs.forEach((formComp) => {
      if (!formComp.isValid()) {
        isValid = false;
      }
    });

    return isValid;
  }
  
  clear() {
    this.formCompRefs.forEach((formComp) => {
      formComp.clear();
    });
  }

  serialize() {
    var formComps = this.formCompRefs.map((ref) => {
      return ref.serialize();
    });

    this.setState({
      status: this.status.SERIALIZING,
      formComps: formComps
    });
  }
}

export default Form;