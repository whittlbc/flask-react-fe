import React, { Component } from 'react';
import Session from '../../utils/Session';

class Header extends Component {

  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }
  
  getLinks() {
    var links;

    if (Session.authed()) {
      links = [
        {
          text: 'Public Link',
          href: '/public-link',
          featured: true
        },
        {
          text: 'Authed Link',
          href: '/authed-link'
        }
      ];
    } else {
      links = [
        {
          text: 'Public Link',
          href: '/public-link',
          featured: true
        }
      ];
    }

    return links.map((data, i) => {
      var classes = ['header-nav-link'];
      
      if (data.featured) {
        classes.push('featured');
      }
      
      return <a key={i} href={data.href} className={classes.join(' ')}>{data.text}</a>;
    });
  }

  getClasses() {
    return this.props.fixed ? 'fixed' : '';
  }

  render() {
    return (
      <header className={this.getClasses()}>
        <nav className="header-nav">
          <div className="header-left">
            <a href="/">
              <img alt="Logo" src="" />
            </a>
          </div>
          <div className="header-right">
            <div className="header-dktp">{this.getLinks()}</div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
