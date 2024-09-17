import React, { useEffect, useState } from 'react'
import { WiDaySunny } from 'weather-icons-react';
import { WiSnowflakeCold } from 'weather-icons-react';

const Week = ({name,status}) => {
    const [data, setdata] = useState([]);
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
            .then(response => {console.log(response.forecast.forecastday[0].hour[0].temp_c)
            setdata(response);})
            .catch(err => {console.error(err)
              setdata(undefined);});
    }, [data])
  return (
    <div>
      <div className="cards" id="weather-cards">
        {
            data==undefined||data.length==0?data:data.forecast.forecastday.map((day)=>{
                    return(
                        <div className="card">
                    <h2 class="day-name">{day.date}</h2>
                    <div class="card-icon">
                    <img src={day.day.condition.icon} class="day-icon" alt="" />
                    </div>
                    <div class="day-temp">
                    <h3 class="temp">{status?day.day.maxtemp_c:day.day.maxtemp_f} </h3>
                    <h3 class="temp-unit">{status?"°C":"°F"}</h3>
                    </div>
                    </div>
                    )
            })
        }
      </div>
    </div>)
}

export default Week

{/* <div className="card">
                <h2 class="day-name">{time}</h2>
            <div class="card-icon">
              {bool_day?<WiDaySunny style={{transform:`scale(2.4)`}}></WiDaySunny>:<WiSnowflakeCold style={{transform:`scale(2.4)`}}></WiSnowflakeCold>}
            </div>
            <div class="day-temp">
              <h2 class="temp">{d.temp_c}</h2>
              <span class="temp-unit">°C</span>
            </div>
                </div> */}
