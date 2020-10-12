import React, { lazy } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { AdminRoute, ProtectedRoute } from './common/route';
import { NotFoundPage, ForbiddenPage } from './pages/errors';
import { withTracker } from './common/withTracker';

const AdminQuotes = lazy(() => import('./pages/admin/quotes'));
const AdminCreate = lazy(() => import('./pages/admin/create'));
const AdminEdit = lazy(() => import('./pages/admin/edit'));

const Home = lazy(() => import('./pages/home'));
const Quote = lazy(() => import('./pages/quote'));
const Quotes = lazy(() => import('./pages/quotes'));
const SignIn = lazy(() => import('./pages/signin'));
const Favorites = lazy(() => import('./pages/favorites'));
const Submit = lazy(() => import('./pages/submit'));

export const Routes = withRouter(withTracker(WrappedRoutes));

function WrappedRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/quotes" component={Quotes} />
      <Route path="/signin" component={SignIn} />
      <Route path="/quotes/:id/:slug" component={Quote} />

      <AdminRoute exact path="/admin/quotes" component={AdminQuotes} />
      <AdminRoute path="/admin/quotes/:id/edit" component={AdminEdit} />
      <AdminRoute path="/admin/quotes/create" component={AdminCreate} />

      <ProtectedRoute path="/favorites" component={Favorites} />
      <ProtectedRoute
        path="/submit"
        redirectAdminTo="/admin/quotes/create"
        component={Submit}
      />

      <Route path="/404" component={NotFoundPage} />
      <Route path="/403" component={ForbiddenPage} />
      <Redirect to="/404" />
    </Switch>
  );
}
