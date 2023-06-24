import { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Factor2022 from "../components/Factor2022";

export default function UpdateFactor() {
    return (
        <Fragment>
          <NavBar />
          <Factor2022 />
        </Fragment>
      );
}