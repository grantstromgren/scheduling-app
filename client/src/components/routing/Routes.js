import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Register from "components/auth/Register";
import Login from "components/auth/Login";
import Alert from "components/layout/Alert";
import Dashboard from "components/dashboard/Dashboard";
import AddShift from "components/shifts/AddShift";
import EditShift from "components/shifts/EditShift";
import DeleteShift from "components/shifts/DeleteShift";

import NotFound from "components/layout/NotFound";
import PrivateRoute from "components/routing/PrivateRoute";

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/shifts/add" component={AddShift} />
          <PrivateRoute exact path="/shifts/edit/:id" component={EditShift} />
          <PrivateRoute
            exact
            path="/shifts/delete/:id"
            component={DeleteShift}
          />
          <Route component={NotFound} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
