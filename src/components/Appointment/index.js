import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) { 
  const CREATE = "CREATE";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const SAVING = "SAVING";

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header
          time={props.time}
      />      
      {mode === EMPTY && (
        <Empty         
            onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      /> 
      )}
      {mode === CREATE && (
        <Form
            interviewers={props.interviewers}
            onSave={() => transition(SAVING)}
            onCancel={() => back()}
          />
      )}
      
    </article>
  );
 }