import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <br />
      <p className="text-center">
        Scheduling App Code Challenge
        <br />
        &copy; {new Date().getFullYear()} Grant Stromgren
      </p>
    </Fragment>
  );
};

export default Footer;
