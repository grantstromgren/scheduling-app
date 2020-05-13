import React from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

const Shift = ({ shift: { user, from, to, _id } }) => {
  let editShift = `/shifts/edit/${_id}`;
  let deleteShift = `/shifts/delete/${_id}`;
  return (
    <div className="border-bottom mt-3 pb-3">
      <p>
        <em>{user.email}</em>
      </p>
      <p>
        <strong>Shift:</strong>{" "}
        {moment(from)
          .tz("America/Chicago")
          .format("M/D h:mma")}{" "}
        to{" "}
        {moment(to)
          .tz("America/Chicago")
          .format("h:mma")}
      </p>
      <Link className="btn btn-sm btn-primary" to={editShift}>
        Edit Shift
      </Link>
      <Link className="btn btn-sm btn-danger ml-2" to={deleteShift}>
        Delete Shift
      </Link>
    </div>
  );
};

export default Shift;
