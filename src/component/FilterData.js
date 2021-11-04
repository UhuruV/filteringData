import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterData = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState(fetchedData);

  const styles ={
    display:'inline',
    width:'30%',
    height:50,
    float:'left',
    padding:5,
    border:'0.5px solid black',
    marginBottom:10,
    marginRight:10
  }

  const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result=fetchedData.filter((data)=>{
            return data.title.search(value) != -1;
        });
        setFilteredData(result);
  };

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => {
        console.log(response.data);
        setFetchedData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(`Ooooops!, there's an error: ${error}`);
      });
  }, []);

  return (
    <div>
      <div className="App">
        <div style={{ margin: "0 auto", marginTop: "10%" }}>
          <label>Search:</label>
          <input type="text" onChange={(event) => handleSearch(event)} />
        </div>
      </div>
      <div className="data" style={{ padding: 10 }}>
          
          {filteredData.map((value,index)=>{
              return(
                <div key={value.id} style={styles}>
                    <div className="element" >
                        {value.title}
                    </div>
                </div>
              )
          })}
          
      </div>
    </div>
  );
};

export default FilterData;
