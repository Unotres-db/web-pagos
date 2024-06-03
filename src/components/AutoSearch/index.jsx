import React, { useState } from 'react';
import "./AutoSearch.css";

import { Paper, Button, Grow }  from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

export default function AutoSearch({ placeholder, data }){
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
    
  function handleClick (SearchStringParam, symbolParam) {
    setSelectedCompany(symbolParam);
    setWordEntered(SearchStringParam);
    setFilteredData([]);
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.searchString.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <>
    <div className="container"> 
    <Paper elevation={6} >

    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          autoFocus
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <Grow in timeout = {1000}>
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Button size="small" disableRipple fullWidth style={{width:"100%", justifyContent: "flex-start", fontSize:"11px",textTransform: "none"}} onClick={()=>handleClick(value.searchString, value.symbol)}>{value.searchString}</Button>
          );
          })}
        </div>
        </Grow>
      )}
    </div>
    </Paper>
    </div> 
    </>
  )
}