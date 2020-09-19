import React, { lazy } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { AdminRoute, ProtectedRoute } from './common/route';
import { NotFoundPage, ForbiddenPage } from './pages/errors';
import { withTracker } from './common/withTracker';

const Home = lazy(() => import('./pages/home'));
const Quote = lazy(() => import('./pages/quote'));
const Quotes = lazy(() => import('./pages/quotes'));
const AdminQuotes = lazy(() => import('./pages/admin/quotes'));
const Search = lazy(() => import('./pages/search'));
const SignIn = lazy(() => import('./pages/signin'));
const Favorites = lazy(() => import('./pages/favorites'));
const Form = lazy(() => import('./pages/form'));

function _Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/quotes" component={Quotes} />
      <Route path="/search" component={Search} />
      <Route path="/signin" component={SignIn} />

      <AdminRoute
        exact
        path={['/quotes/:id/edit', '/create']}
        component={Form}
      />
      <Route path="/quotes/:id/:slug" component={Quote} />

      <AdminRoute path="/admin/quotes" component={AdminQuotes} />
      <ProtectedRoute path="/favorites" component={Favorites} />
      <ProtectedRoute
        path="/submit"
        redirectAdminTo="/create"
        component={Form}
      />

      <Route path="/404" component={NotFoundPage} />
      <Route path="/403" component={ForbiddenPage} />
      <Redirect to="/404" />
    </Switch>
  );
}

const Routes = withRouter(withTracker(_Routes));
export { Routes };
