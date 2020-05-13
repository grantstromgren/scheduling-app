import React, { Fragment, useState } from "react";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Redux
import { getCurrentUser } from "actions/userActions";
import { deleteShift } from "actions/shiftActions";

// Set localization, just in case
moment.locale("en");

const DeleteShift = ({ deleteShift, auth: { jwt }, match }) => {
  const [deleted, setDeleted] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    deleteShift(match.params.id);
    setDeleted(true);
  };

  return deleted ? (
    <Redirect to="/dashboard" />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Are you sure?</h1>
      <p className="lead">
        <i className="fas fa-exclamation-triangle" /> This cannot be undone
      </p>
      <form onSubmit={e => onSubmit(e)}>
        <input type="submit" className="btn btn-danger my-2" value="Delete" />
        <Link className="btn btn-secondary my-1 ml-2" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

DeleteShift.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  deleteShift: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser, deleteShift }
)(DeleteShift);
