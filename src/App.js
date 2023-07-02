import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Context from "./Context";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UpdateFactor from "./pages/UpdateFactor";
//import { riskFactors } from "./data/riskFactors";

function App() {

  //const path = "http://localhost:8000/";
  const path = "https://motorway-riskfactor-server-ccfd827b1ce8.herokuapp.com/";
  

  // const [data, setData] = useState(riskFactors);
  const [data, setData] = useState([]);
  const updateData = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    const jsonData = JSON.stringify(data);

    if(jsonData !== '[]') {
      axios
      .post(path, { jsonData })
      .then((response) => {
        console.log("post success ", response)
        console.log("post success ", jsonData)
      })
      .catch((error) => {
        console.log(error);  
      });
    }
  }, [data])

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const riskFactorsData = await axios.get(path);
      console.log(riskFactorsData)
      setData(riskFactorsData.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Context.Provider value={{ data, updateData }}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/update" element={<UpdateFactor />} />
          <Route path="*" element={<Search />}/>
        </Routes>
      </Context.Provider>
    </Fragment>
  );
}

export default App;
