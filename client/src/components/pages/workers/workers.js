import React, {Fragment, useEffect, useState} from 'react';
import Search from '../../search';
import { useHttp } from './../../../hooks/http.hooks';

const WorkersTable = ({workers}) => {
	const data = workers.map(worker => {
		const {name, surname, age, gender, position, married, id} = worker;

		return (
			<tr  key={id} className="table-active">
				<td>{name}</td>
				<td>{surname}</td>
				<td>{age}</td>
				<td>{gender}</td>
				<td>{position}</td>
				<td>{((married==="true") ? "yes" : "no")}</td>
				<td hidden>{id}</td>
			</tr>
		)
	})		
	
	return (
		<table className="table table-hover">
			<thead>
				<tr className="table-primary">
					<th scope="col">Name</th>
					<th scope="col">Surname</th>
					<th scope="col">Age</th>
					<th scope="col">Gender</th>
					<th scope="col">Position</th>
					<th scope="col">Married</th>
				</tr>
			</thead>
			<tbody>
				{data}
			</tbody>
		</table> 
	)
}

export const Workers = () => {
	const {loading, request, error} = useHttp();
	const [workersData, setWorkersData] = useState([]);
	const [term, setTerm] = useState("");
	
	const search = (items, term) => {
		if (term.length == 0) {
			return items;
		}

		return items.filter((item) => {
			return item.surname.indexOf(term)>-1; 
		})
	}

	const get_data = async () => {
		try {
			const workers_data = await request('http://localhost:5000/workers', 'GET')
			setWorkersData(workers_data);
		} catch (e) {

		}		
	};

	const onCangeHandler = (event) => {
		setTerm(event.target.value)
	};

	useEffect(() => {
		get_data();
	},[]);

	if (loading) {
		return (
			<div>Data loading</div>
		)
	} 

	if (!workersData.length>0) {
		return (
			<p>No records in database</p>
		)
	}

	const filtredData = search(workersData, term)

	return (
		<Fragment>
			<Search onCangeHandler={onCangeHandler} />
			<WorkersTable workers={filtredData}/>
		</Fragment>	
	)
};

