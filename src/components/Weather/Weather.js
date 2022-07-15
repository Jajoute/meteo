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
import CircularProgress from '@mui/material/CircularProgress';
import Time from '../Time/Time';

const Weather = () => {
  const [weather, setWeather] = useState(false);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  async function getWeather() {
    await delay(2000);
    try {
      const intervalId = setInterval(() => { /* TODO document why this arrow function is empty */ }, 10000);
      clearInterval(intervalId);
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
    let humidityData = weatherData.hourly.relativehumidity_2m[getIndex(weatherData)];
    return humidityData.toString();
  }

  function getPressure(weatherData){
    let pressureData = weatherData.hourly.surface_pressure[getIndex(weatherData)];
    return pressureData.toString();
  }

  function getWeatherTextCode(){
    return code[weather.current_weather.weathercode];
  }
  
  function getImage(weatherData){
    if(weatherData.current_weather.weathercode === 0){
      return sun;
    }else{
      return cloudy;
    }
  }
  
  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div>
        <div className={weather!==false?"Weather":"Weather-hide"}>
          <Time></Time>
          <p className="Loc-temp">Paris</p>
          {/* Start contains responsive */}
          <div className="Time-weather-no-responsive">
            <p className="Time-weather">{weather?"Latitude: "+weather.latitude+" Longitude: "+weather.longitude.toFixed(2):""}</p>
          </div>
          <div className="Time-weather-responsive">
            <p className="Time-weather">{weather?"Longitude: "+weather.longitude.toFixed(2):""}</p>
            <p className="Time-weather">{weather?"Latitude: "+weather.latitude.toFixed(2):""}</p>
          </div>
          {/* End contains responsive */}
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

        <div className={weather===false?"Loading":"Weather-hide"}>
          <CircularProgress></CircularProgress>
        </div>
    </div>
  )
}

export default Weather;
