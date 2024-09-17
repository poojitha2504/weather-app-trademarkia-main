import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar.js'
import Navbar from './Navbar.js';
import './css-files/Home.css';
import { LoopRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { WiDegrees } from 'weather-icons-react';
import { useStateValue } from '../StateProvider.js';
const Home = () => {
  const [{city_name},dispatch]=useStateValue();
  var cities = ["Delhi","Mumbai","New York","San Francisco","Tokyo","London"];
  var a= JSON.parse(window.localStorage.getItem('history'));
  if(a==undefined||a==null)
  {
    a=cities;
  }
  else{
    if(a.length>6)
    {
      a=a.splice(0,6);
    }
  }
  return (
     <div className="wrapper">
      <Sidebar></Sidebar>
      <div className="main">
        {/* <Navbar></Navbar> */}
        {/* <Today></Today> */}
        <div className="highlights">
          <h2 className="heading">Top City Weather</h2>
                {a.map((city)=>{
                    return(
              <Link to="/weather/today" onClick={()=>{
                console.log(city);
                dispatch({
                  type:'CITY_SET',
                  city:city,
                })
              }}
              style={{textDecoration: 'none'}}
              >
              <div className="cards">
              <div className="card2">
              <h4 className="card-heading"></h4>
              <div className="content">
                <p className="uv-index">{city}
                {/* <WiDegrees style={{marginLeft:-10,transform: `scale(1.5)`}}></WiDegrees>C */}
                </p>
                <p className="uv-text">Click to View</p>
              </div>
            </div> 
            </div>
            </Link>
            
            )
                })}
        </div>
        <p className="credits">Created by Akshay Rai</p>
      </div>
    </div>
  )
}

export default Home
