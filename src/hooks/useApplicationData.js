import { useEffect, useReducer } from "react";

import { reducer,
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW } from "reducers/application";

const axios = require('axios');

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const days = axios.get(`http://localhost:8001/api/days`);
    const appointments = axios.get(`http://localhost:8001/api/appointments`);
    const interviewers = axios.get(`http://localhost:8001/api/interviewers`);
    Promise.all([days,appointments,interviewers])
    .then(([days, appointments, interviewers]) => 
      dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data })
    )
  }, []);

  const bookInterview = function(id, dayName, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, dayName, interview });
    });
  };

  const cancelInterview = function(id, dayName) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, dayName, interview: null });
    });        
  };
  
  return {bookInterview,
    cancelInterview,
    state,
    setDay};
}