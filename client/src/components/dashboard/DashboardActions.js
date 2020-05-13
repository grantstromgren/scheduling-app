import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="mt-4">
      <Link to="/shifts/add" className="btn btn-primary">
        <i className="fa fa-plus" /> Add New Shift
      </Link>
    </div>
  );
};

export default DashboardActions;
