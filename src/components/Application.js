import React, { useState, useEffect } from "react";

import axios from 'axios'

import "components/Application.scss";

import Appointment from "components/Appointment/index"
import DayList from "components/DayList.js";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors"; //

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day}));

  useEffect(() => {
    const getDaysURL = 'http://localhost:8001/api/days';
    const getAppointmentsURL = 'http://localhost:8001/api/appointments';
    const getInterviewersURL = 'http://localhost:8001/api/interviewers';
    const days = axios.get(getDaysURL);
    const appointments = axios.get(getAppointmentsURL);
    const interviewers = axios.get(getInterviewersURL);

    Promise.all([days,appointments,interviewers])
    .then(([days, appointments, interviewers]) => 
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    )
  }, [])

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

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
            days={state.days}
            day={state.day}
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
        {schedule}
      </section>
    </main>
  );
}
