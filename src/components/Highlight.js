import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
const Highlight = ({name}) => {
  const [data,setdata]=useState([]);
  const [{city_name},dispatch]=useStateValue();
  useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3a2c9f5e70msh4fd22237ba94150p1b8d77jsn9bed91208b46',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${name}&days=3`, options)
        .then(response => response.json())
        .then(response => {
            if(response?.error==undefined){
                setdata(response);
            }
            else{
                setdata(undefined);
            }
        })
        .catch(err => {console.error(err+"error")
            setdata(undefined);
        });
  }, [name]);
//   console.log(data);
//   console.log(data?.error.message);
  return (
    <>
    {data==undefined?"Enter valid city name":<div className="highlights">
          <h2 className="heading">today's highlights</h2>
          <div className="cards">
            <div className="card2">
              <h4 className="card-heading">UV Index</h4>
              <div className="content">
                <p className="uv-index">{data.length==0?data:data.current.uv}</p>
                <p className="uv-text">{data.length==0?data:data.current.uv < 5?"Low":"High"}</p>
              </div>
            </div>
            <div className="card2">
              <h4 className="card-heading">Wind Status</h4>
              <div className="content">
                <p className="wind-speed">{data.length==0?data:data.current.wind_kph}</p>
                <p>km/h</p>
              </div>
            </div>
            <div className="card2">
              <h4 className="card-heading">Pressure</h4>
              <div className="content">
                <p className="sun-rise">{data.length==0?data:data.current.pressure_mb}</p>
                <p className="sun-set">mb</p>
              </div>
            </div>
            <div className="card2">
              <h4 className="card-heading">Humidity</h4>
              <div className="content">
                <p className="humidity">{data.length==0?data:data.current.humidity}%</p>
                <p className="humidity-status">Normal</p>
              </div>
            </div>
            <div className="card2">
              <h4 className="card-heading">Cloud</h4>
              <div className="content">
                <p className="visibilty">{data.length==0?data:data.current.cloud}%</p>
                <p className="visibilty-status">Normal</p>
              </div>
            </div>
            <div className="card2">
              <h4 className="card-heading">Precipitation</h4>
              <div className="content">
                <p className="air-quality">{data.length==0?data:data.current.precip_in}</p>
                <p className="air-quality-status">inches</p>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Highlight
