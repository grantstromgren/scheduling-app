import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Scheduling App Code Challenge</h1>
          <p className="lead">
            A completed scheduling application for a code challenge.
          </p>
          <p>To begin, you can:</p>
          <ul>
            <li>
              Click Login button below and use either the following credentials:
              <ul>
                <li>admin@schedulingapp.com/admin1234</li>
                <li>user@schedulingapp.com/user1234</li>
              </ul>
            </li>
            <li>Click the Register button below to create a new user.</li>
          </ul>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
            <Link to="/login" className="btn btn-info ml-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
