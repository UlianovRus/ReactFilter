import React, { Component } from 'react';
import fromJson from './employees.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './Employee.css';
class Employee extends Component {
  constructor(props) {
		super(props);
		this.state = {
		  employee: fromJson.find(function(element){
        return element.id == props.match.params.id; 
      })
		};
	}
  render() {
    return (
      <div className="employee">
        <Link to='/'>
          <div className="employee__shadow"></div>
        </Link>
        <div className="employee__modal">
          <p>{this.state.employee.name}</p>
          <p>{this.state.employee.role}</p>
          <p>{this.state.employee.phone}</p>
          <p>{this.state.employee.birthday}</p>
          <p>{this.state.employee.isArchive ? 'В архиве' : 'Не в архиве'}</p>
        </div>
      </div>
    );
  }
}

export default Employee;
