import React from "react";

import DayListItem from "components/DayListItem.js";
export default function DayList(props){

  return (
    <ul>
      {props.days.map(day => (
          <DayListItem 
            key={day.id}
            name={day.name} 
            spots={props.getSpotsForDay(props.appointments, props.days, day.name)} 
            selected={day.name === props.day}
            setDay={props.setDay}  
          />
          ))
      }
    </ul>
  )
}