import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
const Navbar = () => {
    const {details}=useParams();
    const [{deg_status},dispatch]=useStateValue();
    var activetoday= details=="today"?"active":"";
    var activeweek= details=="week"?"active":"";
    const [deg, setdeg] = useState(true);
    const [his,sethis]=useState(false);
    var c= deg?"active":"";
    var f= !deg?"active":"";

  return (
    <div>
        <nav>
          <ul className="options">
          <Link to="/weather/today">
            <button className={`hourly ${activetoday}`} id="today" >today</button>
          </Link>
          <Link to="/weather/week">
            <button className={`week ${activeweek}`}>week</button>
            </Link>
          </ul>
          <ul className="options units">
            <button className={`celcius ${c}`} onClick={()=>{
                setdeg(true);
                dispatch({
                    type:'DEGREE_SET',
                    deg:true,
                })
            }}>°C</button>
            <button className={`fahrenheit ${f}`}
            onClick={()=>{
            setdeg(false);
            dispatch({
                    type:'DEGREE_SET',
                    deg:false,
                })
            }}
            >°F</button>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar