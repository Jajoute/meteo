import React, { useEffect, useState } from 'react';
import './Weather.scss';
import logo from '../../logo.svg';
import pressure from '../../asset/Group Thermometer.svg'
import humidity from '../../asset/humidity.svg'
import windspeed from '../../asset/windspeed.svg'
import cloudy from '../../asset/WeatherIcon - 2-39.svg'
import sun from '../../asset/WeatherIcon - 2-22.svg'
import axios from 'axios';
import moment from 'moment';
import code from "./code";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  async function getWeather() {
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3510&hourly=temperature_2m,relativehumidity_2m,surface_pressure&current_weather=true');
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function getIndex(weatherData){
    let time = moment().format("YYYY-MM-DD").toString()+"T"+moment().format("HH").toString()+":00";
    return weatherData.hourly.time.findIndex((value) => (value===time));
  }
  
  function getHumidity(weatherData){
    let humidity = weatherData.hourly.relativehumidity_2m[getIndex(weatherData)];
    return humidity.toString();
  }

  function getPressure(weatherData){
    let humidity = weatherData.hourly.surface_pressure[getIndex(weatherData)];
    return humidity.toString();
  }

  function getWeatherTextCode(){
    return code[weather.current_weather.weathercode];
  }
  
  function getImage(weather){
    if(weather.current_weather.weathercode === 0){
      return sun;
    }else{
      return cloudy;
    }
  }
  
  useEffect(() => {
    getWeather();
  },[])
  
  return (
  <div className="Weather">
    <p className="Loc-temp">Paris</p>
    <p className="Time-weather">{weather?"Latitude: "+weather.latitude+" Longitude: "+weather.longitude:""}</p>
    <img src={weather?getImage(weather):logo} className="App-logo" alt="logo" />
    <p className="Time-weather">{weather?getWeatherTextCode():""}</p>
    <p className="Loc-temp">{weather?weather.current_weather.temperature+"°C":""}</p>

    <div className="data-weather">
      <div>
        <img src={humidity} className="App-humidity" alt="humidity" />
        <p>{weather?getHumidity(weather)+"%":""}</p>
      </div>
      <div>
        <img src={windspeed} className="App-windspeed" alt="windspeed" />
        <p>{weather?weather.current_weather.windspeed+"Km/h":""}</p>
      </div>
      <div>
        <img src={pressure} className="App-pressure" alt="pressure" />
        <p>{weather?getPressure(weather)+"hPa":""}</p>
      </div>
    </div>
  </div>
  )
}

export default Weather;
