import React, { Fragment, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import Shift from "./Shift";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";

// Redux
import { getCurrentUser } from "actions/userActions";
import { getShifts } from "actions/shiftActions";

// Set localization, just in case
moment.locale("en");

const Dashboard = ({
  getCurrentUser,
  getShifts,
  auth: { jwt },
  user: { user, loading },
  shift: { shifts }
}) => {
  useEffect(() => {
    getShifts();
  }, []);
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome, {user && user.email}
      </p>
      <div>
        <h2>Upcoming Shifts</h2>
        {shifts.length > 0 ? (
          shifts.map(shift => <Shift key={shift._id} shift={shift} />)
        ) : (
          <p>No shifts scheduled.</p>
        )}
      </div>
      {user !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getShifts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  shift: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  shift: state.shift
});

export default connect(
  mapStateToProps,
  { getCurrentUser, getShifts }
)(Dashboard);
