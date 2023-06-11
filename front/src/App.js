import './App.css';
import PrecisionRoll from './components/PrecisionsRoll';
import "axios"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"



function App() {
  const [result, setResult] = useState([]);
  const [informations, setInformations] = useState();
  const [totalResult, setTotalResult] = useState();
  const [hasDataLoaded, sethasDataLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  const GetData = () =>{

    axios.get(`http://localhost:5000/api/data`)
      .then(response => {
        console.log(response)
        setResult(response.data.data)
        setInformations(response.data)
        const total = response.data.total_shop_score*0.01
        setTotalResult(total)
      })
      .catch(error => {
        console.log(error);
      });

  }


  useEffect(() => {
    if (!hasDataLoaded){
      GetData()
      sethasDataLoaded(true)
    }
  });

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  return (
    <div class="page">
    <button onClick={openPopup}>Ouvrir le popup</button>
    {showPopup ? (
  <div className="popup">
    <div class="container">
    <div class="title">
    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="1" d="M11.9707 22C17.4936 22 21.9707 17.5228 21.9707 12C21.9707 6.47715 17.4936 2 11.9707 2C6.44786 2 1.9707 6.47715 1.9707 12C1.9707 17.5228 6.44786 22 11.9707 22Z" fill="#FD9B8E"/>
<path d="M15.2505 11.2999H13.5505V7.33993C13.5505 6.41993 13.0505 6.22993 12.4405 6.91993L12.0005 7.41993L8.28045 11.6499C7.77045 12.2299 7.98045 12.6999 8.75045 12.6999H10.4505V16.6599C10.4505 17.5799 10.9505 17.7699 11.5605 17.0799L12.0005 16.5799L15.7205 12.3499C16.2305 11.7699 16.0205 11.2999 15.2505 11.2999Z" fill="#F6F6FF"/>
</svg>
 <p>{informations.shop_name} </p>
 </div>
      <div class="row">
          <div class="box box3">
            <img src={informations.shop_picture}/>
          </div>
          <div class="box box1">
          <p>Score total</p>
          <PrecisionRoll R={totalResult}/>
          </div>
          <div class="box box2">
          <p>{informations.company_name}</p>
          
          <p>{informations.shop_adress}</p>
          <p>{informations.shop_manager_surname}- {informations.shop_manager_name}</p>
          </div>
          
    </div>
    <div class="row">
      {result.map((data, index) => (
        
          <div class="chart" key={index}>
            <div class="">
            <p> Score n°{index+1}</p>
            <h2> {data.mean_shop}</h2>
            </div>
            <div class="line">
            <div class="line-separator">
            </div>
            </div>
            <div class="chartwidth">
              <p> R</p>
            <PrecisionRoll R={data.R} />
            </div>
          </div>

      ))}
      </div>
      <div class="row-center">
      <button onClick={closePopup}>Fermer</button>
      </div>
    </div>
    </div>
    ) : null}
    </div>
  );
}

export default App;
