import React from 'react'
import DatePicker from "react-datepicker";

const Calender = ({from,setFrom,to,setTo}) => {
  return (
      <>
    <div className="d-flex align-items-center">
    <p className="l-grey source f-20 d-lg-inline-block">
      Sort By:
    </p>
    <div className="ml-2">
      <div
        role="wrapper"
        className="gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group"
      >
        <DatePicker
          selected={from}
          placeholderText="Select a starting date"
          onChange={(from) => setFrom(from)}
          className="sort-date customdate form-control"
        />
        <i
          className="fa enter-icon right-icon fas fa-calendar-alt"
          aria-hidden="true"
        />
      </div>
    </div>
    <div className="ml-2">
      <div
        role="wrapper"
        className="gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group"
      >
        <DatePicker
          selected={to}
          placeholderText="Select a ending date"
          onChange={(to) => setTo(to)}
          className="sort-date customdate form-control"
        />
        <i
          className="fa enter-icon right-icon fas fa-calendar-alt"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
    </>
  )
}

export default Calender