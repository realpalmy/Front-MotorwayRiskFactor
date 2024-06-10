import { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Factors from "../components/FactorInput";

export default function UpdateFactor() {
    return (
        <Fragment>
          <NavBar />
          <Factors />
        </Fragment>
      );
}