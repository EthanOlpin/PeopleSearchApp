import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Search from './components/Search';
import AddPerson from './components/AddPerson';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/addperson' component={AddPerson} />
        <Route path='/search' component={Search} />
      </Layout>
    );
  }
}
