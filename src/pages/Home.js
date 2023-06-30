import { Fragment } from "react";
import Factor2022 from "../components/Factor2022";
import SearchGroup from "../components/SearchGroup";
import NavBar from "../components/NavBar";



export default function Home() {
  return (
    <Fragment>
      <NavBar />
      <SearchGroup />
      <Factor2022 />
    </Fragment>
  );
}
