import { Component } from 'react';

class AbstractComponent extends Component {
  constructor(props) {
    super(props);
    this.MOBILE_THRESH = 991;
  }
}

export default AbstractComponent;