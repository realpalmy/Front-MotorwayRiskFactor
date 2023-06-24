import { Fragment, useState, useEffect } from "react";
import SearchGroup from "../components/SearchGroup";
import NavBar from "../components/NavBar";

export default function Search() {
    return (
        <Fragment>
          <NavBar />
          <SearchGroup />
        </Fragment>
      );
}