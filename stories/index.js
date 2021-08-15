import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'index.scss';

import Button from 'components/Button';
import DayList from 'components/DayList';
import DayListItem from 'components/DayListItem';

import InterviewerList from 'components/InterviewerList';
import InterviewerListItem from 'components/InterviewerListItem';

import Appointment from 'components/Appointment';
import Confirm from 'components/Appointment/Confirm';
import Empty from 'components/Appointment/Empty';
import Error from 'components/Appointment/Error';
import Form from 'components/Appointment/Form';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Status from 'components/Appointment/Status';

import { getSpotsForDay } from 'helpers/selectors';

const appointments = {
  '1': { id: 1, time: '12pm', interview: null },
  '2': { id: 2, time: '1pm', interview: null },
  '3': {
    id: 3,
    time: '2pm',
    interview: { student: 'Archie Cohen', interviewer: 2 }
  },
  '4': {
    id: 4,
    time: '3pm',
    interview: { student: 'Chad Takahashi', interviewer: 2 }
  },
  '5': {
    id: 5,
    time: '4pm',
    interview: { student: 'Chad Takahashi', interviewer: 2 }
  }
};

const days = [
  {
    id: 1,
    name: 'Monday',
    appointments: [1, 2, 3],
    interviewers: [1, 3, 4]
  },
  {
    id: 2,
    name: 'Tuesday',
    appointments: [4, 5],
    interviewers: [3, 5]
  }
];

const interviewer = {
  id: 1,
  name: 'Sylvia Palmer',
  avatar: 'https://i.imgur.com/LpaY82x.png'
};

const interviewers = [
  { id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png' },
  { id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png' },
  { id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png' },
  { id: 4, name: 'Cohana Roy', avatar: 'https://i.imgur.com/FK8V841.jpg' },
  { id: 5, name: 'Sven Jones', avatar: 'https://i.imgur.com/twYrpay.jpg' }
];

storiesOf('Button', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }]
  })
  .add('Base', () => <Button>Base</Button>)
  .add('Confirm', () => <Button confirm>Confirm</Button>)
  .add('Danger', () => <Button danger>Cancel</Button>)
  .add('Clickable', () => (
    <Button onClick={action('button-clicked')}>Clickable</Button>
  ))
  .add('Disabled', () => (
    <Button disabled onClick={action('button-clicked')}>
      Disabled
    </Button>
  ));

storiesOf('DayListItem', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }]
  })
  .add('Unselected', () => <DayListItem name="Monday" spots={5} />)
  .add('Selected', () => <DayListItem name="Monday" spots={5} selected />)
  .add('Full', () => <DayListItem name="Monday" spots={0} />)
  .add('Clickable', () => (
    <DayListItem name="Tuesday" setDay={action('setDay')} spots={5} />
  ));

storiesOf('DayList', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }]
  })
  .add('Monday', () => (
    <DayList
      days={days}
      selectedDay={'Monday'}
      setDay={action('setDay')}
      getSpotsForDay={getSpotsForDay}
      appointments={appointments}
    />
  ))
  .add('Tuesday', () => (
    <DayList
      days={days}
      selectedDay={'Tuesday'}
      setDay={action('setDay')}
      getSpotsForDay={getSpotsForDay}
      appointments={appointments}
    />
  ));

storiesOf('InterviewerListItem', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }]
  })
  .add('Unselected', () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add('Selected', () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add('Clickable', () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={action('setInterviewer')}
    />
  ));

storiesOf('InterviewerList', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }]
  })
  .add('Initial', () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action('onChange')}
    />
  ))
  .add('Preselected', () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action('onChange')}
    />
  ));

storiesOf('Appointment', module)
  .addParameters({
    backgrounds: [{ name: 'white', value: '#fff', default: true }]
  })
  .add('Appointment', () => <Appointment />)
  .add('Header', () => <Header time={appointments[1].time} />)
  .add('Empty', () => <Empty mode="EMPTY" onAdd={action('onAdd')} />)
  .add('Show', () => (
    <Show
      mode="SHOW"
      student={appointments[3].interview.student}
      interviewer={interviewer}
      onEdit={action('onEdit')}
      onDelete={action('onDelete')}
    />
  ))
  .add('Confirm', () => (
    <Confirm
      onCancel={action('onCancel')}
      onConfirm={action('onConfirm')}
      message="Delete the Appointment?"
    />
  ))
  .add('Saving', () => <Status message="Saving" />)
  .add('Deleting', () => <Status message="Deleting" />)
  .add('Error Saving', () => (
    <Error message="Could not save appointment." onClose={action('onClose')} />
  ))
  .add('Error Deleting', () => (
    <Error
      message="Could not delete appointment."
      onClose={action('onClose')}
    />
  ))
  .add('Create', () => (
    <Form
      mode="CREATE"
      interviewers={interviewers}
      onSave={action('onSave')}
      onCancel={action('onCancel')}
    />
  ))
  .add('Edit', () => (
    <Form
      mode="EDIT"
      name="Sebastien Dufresne"
      interviewer={3}
      interviewers={interviewers}
      onSave={action('onSave')}
      onCancel={action('onCancel')}
    />
  ))
  .add('Appointment Empty', () => (
    <Fragment>
      <Appointment id={1} time="12pm" onAdd={action('onAdd')} />
      <Appointment id="last" time="1pm" onAdd={action('onAdd')} />
    </Fragment>
  ))
  .add('Appointment Booked', () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: 'Lydia Miller-Jones', interviewer }}
        onEdit={action('onEdit')}
        onDelete={action('onDelete')}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ));
