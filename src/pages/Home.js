import { Fragment, useState, useEffect } from "react";
import { riskFactors } from "../data/riskFactors";
import Table from "../components/Table";
import Factor2022 from "../components/Factor2022";
import SearchGroup from "../components/SearchGroup";
import NavBar from "../components/NavBar";



export default function Home() {
  const [data, setData] = useState(riskFactors);
  const [searchData, setSearchData] = useState(riskFactors);

  const [selectYear, setSelectYear] = useState("");
  const [selectQuarter, setSelectQuarter] = useState("");

  const [chance, setChance] = useState("");
  const [effect, setEffect] = useState("");
  
  return (
    <Fragment>
      <NavBar />
      <SearchGroup />
      <Factor2022 />
    </Fragment>
  );
}
