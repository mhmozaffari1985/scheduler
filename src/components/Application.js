import React, { useState, useEffect } from "react";

import axios from 'axios'

import "components/Application.scss";

import Appointment from "components/Appointment/index"
import DayList from "components/DayList.js";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 3,
        name: "Mildard Nazir",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 6,
    time: "5pm",
  },
];

const appointmentList = appointments.map(appointment =>  {
  return (<Appointment key={appointment.id} {...appointment} />);
}
)

export default function Application(props) {
  const [day, setDay] = useState(["Monday"]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const getDaysURL = 'http://localhost:8001/api/days';
    axios.get(getDaysURL).then(response => {
      setDays([...response.data]);
    });
  }, [day])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
      <section className="schedule">
      {appointmentList}
      </section>
    </main>
  );
}
