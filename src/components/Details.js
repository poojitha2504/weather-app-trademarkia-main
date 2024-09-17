import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar';
import Today from './Today';
import Week from './Week';
import Highlight from './Highlight';
import Navbar from './Navbar';
import { useStateValue } from '../StateProvider';
import { Slide } from 'react-reveal';
const Details = () => {
    const{details}=useParams();
    const [{city_name,deg_status}]=useStateValue();
    // const [val, setval] = useState([]);
    // useEffect(() => {
    //     console.log(city_name);
    //       const options = {
    //           method: 'GET',
    //           headers: {
    //               'X-RapidAPI-Key': '3a2c9f5e70msh4fd22237ba94150p1b8d77jsn9bed91208b46',
    //               'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    //           }
    //       };
          
    //       fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city_name}&days=3`, options)
    //           .then(response => response.json())
    //           .then(response => {setval(response)})
    //           .catch(err => console.error(err));
    //   }, [city_name]);
    console.log(details);
  return (
    <div>
        <div className="wrapper">
      <Sidebar></Sidebar>
      <div className="main">
        <Navbar></Navbar>
        {details=="today"?(<Today name={city_name} status={deg_status}></Today>):(<Week name={city_name} status={deg_status}></Week>)}
        {city_name==""?(<>
            Please Enter City Name
        </>):<Highlight name={city_name}></Highlight>}
        <p className="credits">Created by Akshay Rai</p>
      </div>
    </div>
    </div>
  )
}

export default Details