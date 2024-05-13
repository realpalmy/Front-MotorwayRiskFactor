import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Context from "./Context";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UpdateFactor from "./pages/UpdateFactor";

function App() {

  const path = "http://localhost:8000/";
  //const path = "https://s86s2r38q9.execute-api.ap-southeast-1.amazonaws.com/staging/data";
  //const path = "https://motorway-riskfactor-server-ccfd827b1ce8.herokuapp.com/";
  

  const [data, setData] = useState([]);
  const updateData = (newData) => {
    setData(newData);
  };

  //It dose not need to post to change the json data
  /* useEffect(() => {
    const jsonData = JSON.stringify(data);

    if(jsonData !== '[]') {
      axios
      .post(path, { jsonData })
      .then((response) => {
        //console.log("post success ", jsonData)
        console.log("post success")
      })
      .catch((error) => {
        console.log(error);  
      });
    }
  }, [data]) */

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const riskFactorsData = await axios.get(path);
      // console.log(riskFactorsData.data)
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
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/update" element={<UpdateFactor />} />
          <Route path="*" element={<Search />}/>
        </Routes>
      </Context.Provider>
    </Fragment>
  );
}

export default App;
