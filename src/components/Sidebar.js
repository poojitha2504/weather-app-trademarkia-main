import React, { useEffect, useState } from 'react'
import './css-files/Sidebar.css';
import { GpsFixedOutlined, SearchOutlined } from '@material-ui/icons';
import { useStateValue } from '../StateProvider';
import { Link, useNavigate } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import axios from 'axios';
const Sidebar = () => {
   const history = useNavigate();
    const [{city_name,deg_status},dispatch]=useStateValue();
    const [data,setdata]=useState([]);
    const [suggest,setsuggest] = useState([]);
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const chooseLocation= ()=>{
        if(window.confirm("Do you Allow Weather-App to Know Location?")){
          fetchText();
        }
        console.log(lat,long);
        async function fetchText() { 
            let url = 'https://ipinfo.io/json?token=e3b66fb4f9c60a';
            let response = await fetch(url);
            let citydata =await response.json();
            // console.log(data);
            dispatch({
                type:'CITY_SET',
                city:citydata.city,
            });
            history('/weather/today');
            document.getElementById("query").value=citydata.city;
        }
    }
    useEffect(() => {
          const options = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': '3a2c9f5e70msh4fd22237ba94150p1b8d77jsn9bed91208b46',
                  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
              }
          };
          
          fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city_name}&days=3`, options)
              .then(response => response.json())
              .then(response => {console.log(response.forecast.forecastday[0].hour[0].temp_c)
                setdata(response);
                dispatch({
                  type:'HISTORY_SET',
                  city: city_name,
                })
            })
              .catch(err => {console.error(err)
            setdata(undefined)})
      }, [city_name]);
      const searchcomplete = ()=>{
        var val=document.getElementById("query").value;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3a2c9f5e70msh4fd22237ba94150p1b8d77jsn9bed91208b46',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        
        fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${val}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.error==undefined) {
                    setsuggest(response);
                }
                else{
                    setsuggest(undefined);
                }
                console.log(suggest);
            })
            .catch(err => console.error(err));
      }
  return (
      <div className="sidebar">
        <div>
          <form className="search" id="search">
            <input type="text" id="query" placeholder="Search..." onChange={searchcomplete}/>
            <button className='btn-search' onClick={(e)=>{
                e.preventDefault();
                var val=document.getElementById("query").value;
                if(val=="")
                {}
                else{dispatch({type:'CITY_SET',
                city:val,
                })}
            }}>
            <Link to="/weather/today" style={{display:`flex`,alignItem:`center`,justifyContents:`center`,color:`white`}}>
            <SearchOutlined></SearchOutlined>
            </Link>
            </button>
            <ul id="list">
            {
                suggest==undefined||suggest.length==0?"":suggest.map((city)=>{
                    return(
                    <Link to="/weather/today" style={{textDecoration:`none`}}>
                    <li onClick={()=>{document.getElementById("query").value=city.name
                    setsuggest([]);
                    dispatch({type:'CITY_SET',
                    city:city.name,
                    })
                    }}>{city.name}</li>
                    </Link>
                    )
                })
            }
            </ul>
          </form>
          <div className="location" style={{marginTop:-10, marginBottom:10}}>
          <div className="location-icon">
          <GpsFixedOutlined onClick={chooseLocation}/>
          </div>
          <div className="location-text">
            <p id="location">Choose Your Location</p>
          </div>
        </div>
          {city_name==""||data==undefined?"":(<>
            {/* <div className="weather-icon"> */}
            {/* <img id="icon" src={data==undefined||data.length==0?"":data.current.condition.icon} alt="" /> */}
          {/* </div> */}
          <div className="date-time">
            <h2 id="date-time" style={{textAlign:`left`}}>{data==undefined||data.length==0?"":data.location.name}</h2>
          </div>
          <div className="date-time">
            <p id="date-time" style={{textAlign:`left`}}>{data==undefined||data.length==0?"":data.location.region} , {data==undefined||data.length==0?"":data.location.country}</p>
          </div>
          <div className="divider"></div>
          <div className="temperature">
            <h1 id="temp">{data==undefined||data.length==0?"":deg_status?data.current.temp_c:data.current.temp_f}</h1>
            <span className="temp-unit">{deg_status?"°C":"°F"}</span>
          </div>
          <div className="date-time">
            <p id="date-time" style={{textAlign:`left`}}>{data==undefined||data.length==0?"":data.location.localtime}</p>
          </div>
          <div className="divider"></div>
          <div className="condition-rain">
            <div className="condition">
              <p id="condition">{data==undefined||data.length==0?"":data.current.condition.text}</p>
            </div>
            <div className="rain">
              <p id="rain">Sunrise : {data==undefined||data.length==0?"":data.forecast.forecastday[0].astro.sunrise}</p>
            </div>
            <div className="rain">
              <p id="rain">Sunset : {data==undefined||data.length==0?"":data.forecast.forecastday[0].astro.sunset}</p>
            </div>
            <div className="rain">
              <p id="rain">Moonrise : {data==undefined||data.length==0?"":data.forecast.forecastday[0].astro.moonrise}</p>
            </div>
            <div className="rain">
              <p id="rain">Moonset : {data==undefined||data.length==0?"":data.forecast.forecastday[0].astro.moonset}</p>
            </div>
            <div className="rain">
              <p id="rain">Visibility : {data==undefined||data.length==0?"":data.forecast.forecastday[0].day.avgvis_km} km</p>
            </div>
          </div></>)}
        </div>
        <AwesomeButton type="primary" onPress={()=>{
          console.log("Awesome");
          history('/');
        }}>Home</AwesomeButton>
      </div>

  )
}

export default Sidebar
