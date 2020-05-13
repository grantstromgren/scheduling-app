import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Redux
import { getCurrentUser } from "actions/userActions";
import { createShift } from "actions/shiftActions";

const AddShift = ({ getCurrentUser, createShift, auth: { jwt }, history }) => {
  const [formData, setFormData] = useState({ from: "", to: "" });
  const { from, to } = formData;

  const changeFrom = val => {
    setFormData({ ...formData, from: val });
  };

  const changeTo = val => {
    setFormData({ ...formData, to: val });
  };

  const onSubmit = e => {
    e.preventDefault();
    createShift(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add New Shift</h1>
      <p className="lead">
        <i className="fas fa-calendar-alt" /> Let's add a new shift
      </p>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label for="from" className="mr-2">
            Start Date/Time:
          </label>
          <DatePicker
            className="form-control"
            id="from"
            autocomplete="false"
            style={{ width: "300px" }}
            selected={from}
            onChange={val => changeFrom(val)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
          />
        </div>
        <div className="form-group">
          <label for="to" className="mr-2">
            End Date/Time:
          </label>
          <DatePicker
            className="form-control"
            id="to"
            autocomplete="false"
            selected={to}
            onChange={val => changeTo(val)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
          />
        </div>
        <small className="form-text">
          Note: These times should not overlap with an existing shift.
        </small>
        <input type="submit" className="btn btn-primary my-2" />
        <Link className="btn btn-secondary my-1 ml-2" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddShift.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  createShift: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser, createShift }
)(AddShift);
