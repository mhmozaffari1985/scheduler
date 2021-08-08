import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) { 
  const CREATE = "CREATE";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = 'DELETING';
  const ERROR_DELETE = 'ERROR_DELETE';
  const ERROR_SAVE = 'ERROR_SAVE';


  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function genInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  }

  return (
    <article className="appointment">
      <Header
          time={props.time}
      />      
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={() => {
            transition(DELETING,true);
            props
              .cancelInterview(props.id, props.day)
              .then(() => transition(EMPTY))
              .catch(() => {
                transition(ERROR_DELETE, true);
              });
          }}
          message="Delete the Appointment?"
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            transition(SAVING);
            props
              .bookInterview(props.id, props.day, genInterview(name, interviewer))
              .then(() => transition(SHOW))
              .catch(() => {
                transition(ERROR_SAVE, true);
              });
          }}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            transition(SAVING);
            props
              .bookInterview(props.id, props.day, genInterview(name, interviewer))
              .then(() => transition(SHOW))
              .catch(() => {
                transition(ERROR_SAVE, true);
              });
          }}
          onCancel={() => back()}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      
    </article>
  );
 }