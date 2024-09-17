import React, { useEffect, useState } from 'react'
import { Fade} from 'react-reveal';
import { WiDaySunny } from 'weather-icons-react';
import { WiSnowflakeCold } from 'weather-icons-react';
import { useStateValue } from '../StateProvider';
const Today = ({name,status}) => {
    const [data, setdata] = useState([]);
    // const [{city_name}]=useStateValue();
    // const [city, setcity] = useState(city_name)
    useEffect(() => {
      console.log(name);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3a2c9f5e70msh4fd22237ba94150p1b8d77jsn9bed91208b46',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${name}&days=3`, options)
            .then(response => response.json())
            .then(response => {console.log(response.forecast.forecastday[0].hour[0].temp_c)
            setdata(response);})
            .catch(err => {console.error(err)
              setdata(undefined);}
            );
    }, [name]);
    console.log(data);
  return (
    <div>
      <div className="cards" id="weather-cards">
        {data==undefined||data.length==0?data:(data.forecast.forecastday[0].hour.map((d,index)=>{
            var time;
            if(index<12)
            {
                time= index.toString()+":00 am";
            }
            else{
                time= index.toString()+":00 pm";
            }
            var bool_day= true;
            if(d.temp_c<20)
            {
                bool_day=false;
            }
            return(
                <div className="card">
                <h2 class="day-name">{time}</h2>
            <div class="card-icon">
            <img src={d.condition.icon} class="day-icon" alt="" />
            </div>
            <div class="day-temp">
              <h2 class="temp">{!status?d.temp_f:d.temp_c}</h2>
              <span class="temp-unit">{status?"°C":"°F"}</span>
            </div>
                </div>
            )
        }))}
      </div>
    </div>

  )
}

export default Today
