import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Employee from './Employee.js'
import './style/index.css';
import fromJson from './employees.js';


class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: fromJson,			
			employeesToRender: fromJson,
			roles: [],
			choosenRole: ''
		};
	}

	componentDidMount() {
		this.setState({
			roles: this.getRoles()
		})
	}

	nameSortUp() {
		this.setState({             
			employeesToRender: this.state.employees.sort((a,b) => {return a.name > b.name ? -1 : 1;}) 
		});
	}

	dateSortUp() {
		this.setState({             
			employeesToRender: this.state.employees.sort((a,b) => {return this.getMilisecond(a.birthday) < this.getMilisecond(b.birthday) ? -1 : 1;}) 
		});
	}

	nameSortDown() {
		this.setState({             
			employeesToRender: this.state.employees.sort((a,b) => {return a.name < b.name ? -1 : 1;}) 
		});
	}

	dateSortDown() {
		this.setState({
			employeesToRender: this.state.employees.sort((a,b) => {return this.getMilisecond(a.birthday) > this.getMilisecond(b.birthday) ? -1 : 1;}) 
		});
	}

	archiveFilter(event) {
		this.resetFilters();
		if(event.target.checked) {
			this.setState({
				employeesToRender: this.getArchived()
			})	
		} else {
			this.setState({
				employeesToRender: fromJson
			})	
		}
	}

	roleSort(event) {
		let role = event.target.value;

		if(role.length) {
			this.setState({
				employeesToRender: this.state.employees.filter(function(employee) {
					return employee.role === role
				}),
				choosenRole: role
			})
		} else {
			this.setState({
				employeesToRender: this.state.employees,
				choosenRole: role
			})
		}
	}

	resetFilters() {
		this.setState({
			employeesToRender: this.state.employees,
			choosenRole: ''		
		});
	}

	getMilisecond(birthday) {
		return +(new Date(birthday.split('.').reverse().join('/')));
	}

	getRoles() {
		let roles = [];
		this.state.employees.forEach(function(employee) {
			if(!roles.includes(employee.role))
				roles.push(employee.role);
		})
		return roles;
	}

	getArchived() {
		return fromJson.filter(function(employee){
			return employee.isArchive; 
		})
	}

	render() {
		return (
			<Router>
				<div className="container">
						<div className=""></div>
						<Route path='/employee/:id' component={Employee} />
					<div className = "elemets">
					<div className = "sorting">
					<div  className = "sorting_name">
						<div>Сортировка по имени</div>
						<button onClick={this.nameSortDown.bind(this)}>А-Я</button>
						<button onClick={this.nameSortUp.bind(this)}>Я-А</button>
					</div>
					<div className = "sorting_name">
						<div>Сортировка по дате рождения</div>
						<button onClick={this.dateSortUp.bind(this)}>↑</button>
						<button onClick={this.dateSortDown.bind(this)}>↓</button>					
					</div>
						<div className = "sorting_name">
							<div>Фильтровать по должности</div>	
						<select value={this.state.choosenRole} onChange={this.roleSort.bind(this)}>
								<option value='' selected>Выбрать должность</option>
							{this.state.roles.map(function(role){
								return (
									<option value={role}>{role}</option>
								)
							})}
						</select>
						</div>
						<div className = "sorting_name">
							<div>Фильтровать по архиву</div>
						<label value="" onChange={this.archiveFilter.bind(this)}>
							Архив
							<input  type="checkbox"/>
						</label>
						</div>
				</div>
				<div >

					<ul className = "elemets_list ">
					{this.state.employeesToRender.map(function(employee){ 
						return (
							<li>
							<div className="name">
								<div className="name_text">
								<Link className="name_text_link" to={'/employee/'+employee.id}>{employee.name}</Link>
								</div>
							</div>
							<div className ="text" >
								<ul>
								<li>role :</li>
								 <li>phone :</li>
								 </ul>
								 <ul>
									 <li>{employee.role}</li>
									 <li>{employee.phone}</li>
						
								 </ul>
							</div>
							</li>
						)})}
					</ul>
				</div>
			</div>
			</div>
		</Router>
		);
	}
}

ReactDOM.render(<List />, document.getElementById('root'));
registerServiceWorker();