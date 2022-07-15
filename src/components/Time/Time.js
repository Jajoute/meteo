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
      setTime(moment().format().toString());
    }, 1000);
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
  <div>
    <div className="Time-no-responsive">
      <p className="Time">{moment(time).format('LTS, Do MMMM YYYY')}</p>
    </div>
    <div className="Time-responsive">
      <p className="Time">{moment(time).format('Do MMMM YYYY')}</p>
      <p className="Time">{moment(time).format('LTS')}</p>
    </div>
  </div>
  )
}

export default Time;
