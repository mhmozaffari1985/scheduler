import React, { useState, useEffect } from "react";

import axios from 'axios'

import "components/Application.scss";

import Appointment from "components/Appointment/index"
import DayList from "components/DayList.js";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors"; //

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day}));

  useEffect(() => {
    const getDaysURL = 'http://localhost:8001/api/days';
    const getAppointmentsURL = 'http://localhost:8001/api/appointments';
    const getInterviewersURL = 'http://localhost:8001/api/interviewers';
    const getDays = axios.get(getDaysURL);
    const getAppointments = axios.get(getAppointmentsURL);
    const getInterviewers = axios.get(getInterviewersURL);
    
    // axios.get(getDaysURL).then(getDays => {
    //   axios.get(getAppointmentsURL).then(getAppointments => {
    //     axios.get(getInterviewersURL).then(getInterviewers => {
    //       setState(prev => ({...prev, days: getDays.data, appointments: getAppointments.data, interviewers: getInterviewers.data})) 
    //     });
    //   });
    // });

    Promise.all([getDays,getAppointments,getInterviewers])
    .then(([getDays, getAppointments, getInterviewers]) => 
      setState(prev => ({...prev, days: getDays.data, appointments: getAppointments.data, interviewers: getInterviewers.data}))
    )
  }, [])

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });
console.log('sdaasdasdadasdasdasdas hadi');
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
