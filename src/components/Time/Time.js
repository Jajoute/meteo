import React, { useEffect,useState } from 'react';
import './Time.scss';
import moment from 'moment';
import 'moment/locale/fr';

const Time = () => {
  moment.locale('fr');
  const [time, setTime] = useState(moment().format('LTS, Do MMMM YYYY').toString());

  useEffect(() => {
    //Get time
    const intervalId = setInterval(() => {
      setTime(moment().format('LTS, Do MMMM YYYY').toString());
    }, 1000);
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
  <div>
    <p className="Time-weather">{time}</p>
  </div>
  )
}

export default Time;
