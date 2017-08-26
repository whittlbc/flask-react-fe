import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import Session from './utils/Session';

class Main extends Component {

  constructor(props) {
    super(props);

    // public routes
    this.baseRoutes = [
      {
        path: '/',
        comp: Home,
        exact: true
      }
    ];

    // routes for signed-in users only (same format as baseRoutes)
    this.authedRoutes = [];

    this.getRoutes = this.getRoutes.bind(this);
  }

  getRoutes() {
    var routes = this.baseRoutes;

    if (Session.authed()) {
      this.authedRoutes.forEach((route) => {
        routes.push(route);
      });
    }

    return routes.map((route, i) => {
      if (route.exact) {
        return <Route key={i} exact path={route.path} component={route.comp} />;
      } else {
        return <Route key={i} path={route.path} component={route.comp} />;
      }
    });
  }

  render() {
    return (
      <main>
        <Switch>
          {this.getRoutes()}
          <Redirect to='/' />
        </Switch>
      </main>
    );
  }
}

export default Main;
