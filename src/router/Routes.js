import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = ({ error }) => (
  error ? <div>Error!!!</div> : <div>Loading...</div>
);

const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ '../scenes/Home.container'),
  loading: Loading,
  modules: ['Home']
});

const ShowPage = Loadable({
  loader: () => import(/* webpackChunkName: "Show" */ '../scenes/Show.container'),
  loading: Loading,
  modules: ['Show']
});

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage}/>
    <Route path='/show/:type' component={ShowPage}/>
  </Switch>
);

export default Routes;