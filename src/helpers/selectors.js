export function getAppointmentsForDay (state,day) {
  const appointmentsId = state.days
      .filter((e) => e.name === day)
      .map((e) => e.appointments)
      .reduce((acc, val) => acc.concat(val), []);

  const appointment = [];
  appointmentsId.forEach((e) => {
    appointment.push(state.appointments[e]);
  })
  return appointment;
}

export function getInterview (state, interview) {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    const interviewObj = {student, interviewer};
    return interviewObj;
  }
}

export function getInterviewersForDay (state,day) {
  const interviewersId = state.days.filter((e) => e.name === day)
            .map((e) => e.interviewers)
            .reduce((acc, val) => acc.concat(val), []);

            const interviewers = [];
            interviewersId.forEach((e) => {
              interviewers.push(state.interviewers[e]);
            })
  return interviewers;
}

export const getSpotsForDay = (appointments, days, day) => {
  const targetDay = days.find((e) => e.name === day);
  const appointmentList = [...targetDay.appointments];
  const appointmentsSpread = {...appointments};

  const number = Object.values(appointmentsSpread).reduce((total, appointment) => {
    if(appointmentList.includes(appointment.id)) {
      if (appointment.interview) {
        return total + 1;
      }
    }
    return total;
  }, 0);

  return 5 - number;
};