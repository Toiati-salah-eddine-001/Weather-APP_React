import "./weather.css";
import Search from "../assets/img/img/search.png";
import clear from "../assets/img/img/clear.png";
import clouds from "../assets/img/img/clouds.png";
import drizzle from "../assets/img/img/drizzle.png";
import humidity from "../assets/img/img/humidity.png";
import mist from "../assets/img/img/mist.png";
import rain from "../assets/img/img/rain.png";
import snow from "../assets/img/img/snow.png";
import wind from "../assets/img/img/wind.png";
import { useEffect, useRef, useState } from "react";


function Weather() {

  const [weatherData,setweatherData]=useState(false);
  const inputSerch = useRef();
  const allicons={
    "01d": clear,
    "01n": clear,
    "02d": clouds,
    "02n": clouds,
    "03d": clouds,
    "03n": clouds,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

const search = async (City)=>{
  if(inputSerch.current.value==" " || City==""){
    alert("Please enter a city name");
  }
  try {
    // const url =`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${import.meta.env.VITE_APP_ID}`;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=25accae364ea51c88300d9b9dc062a41`;
    const data = await fetch(url);
    const response = await data.json();
    
    if(!data.ok){
      alert(data.message);
      return;
    }
    console.log(response);
    const icon=allicons[response.weather[0].icon] || clear;
    setweatherData({
      humidity:response.main.humidity,
      windspeed:response.wind.speed,
      temperature: Math.floor(response.main.temp),
      location:response.name,
      icon:icon,
    });
  } catch (error) {
    console.log(error)
  }
};

 useEffect(()=>{
  search("London");
}, []);
 
  return (
    <div className="container">
        <div className="search">
            <input type="text" name="search" placeholder="Search ... " className="inpu_Search" ref={inputSerch}/>
            <img src={Search} className="search_icon" onClick={()=>search(inputSerch.current.value)}/>
        </div>
{weatherData && (
          <>
          <img src={weatherData.icon} className="wither_icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="City_name">{weatherData.location}</p>
          <div className="weather_info">
            <div className="col">
              <img src={humidity} />
              <div className="info">
                <p >{weatherData.humidity}%</p>
                <span>humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} />
              <div className="info">
                <p className="">{weatherData.windspeed} km/h</p>
                <span>wind</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather