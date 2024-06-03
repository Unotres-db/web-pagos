import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const useStyles = makeStyles((mainTheme) => ({
  formControl: {
    marginTop: mainTheme.spacing(0),
    maxHeight: 30,
  },
}));

export default function ProjectSelector ({ projectsList, projectIdSearch, projectSearchName, setProjectIdSearch }){
  const classes = useStyles();
  const [wordEntered, setWordEntered] = useState("");  // precisa ser state?

  const handleOnSelect = (item) => {
    setProjectIdSearch(item.id)
  }
  const handleOnSearch = (item) => {
    setWordEntered(item.name)
  }
  const handleOnHover = (result) => {
    // console.log(result);
  };
  const handleOnFocus = () => {
    // console.log("Focused");
  };
  const handleOnClear = () => {
    // setProjectIdSearch()
    // console.log("Cleared");
  };
  
  return (
    <>
    { projectsList ? 
      <>
        <ReactSearchAutocomplete
          items={projectsList}
          placeholder={"Nombre o codigo del proyecto"}
          inputSearchString={projectSearchName}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={handleOnClear}
          styling={{ zIndex: 4, height: "35px", borderRadius: "24px",fontSize: "11px", iconColor: "#344955", color: "#344955", searchIconMargin: '0 0 0 8px',clearIconMargin: '3px 8px 0 0' }} // To display it on top of the search box below
          autoFocus
          // formatResult={formatResult}
        />  
      </>
    : null }

    </>
  )  
}

