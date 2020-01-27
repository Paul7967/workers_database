import React from 'react';
import {Link} from 'react-router-dom';

export const Card = () => {
	// console.log(worker)
	// const {name, surname, age, gender, position, married} = worker;

	return (
		<div className="card">
			<img src={''} alt={''} className="card-img-top" />
			<div className="card-body">
				<h5 className="card-title">Worker {surname} {name}</h5>
				<Link to={'/workers/'+'react'} className="btn btn-primary">Open</Link>
			</div>
		</div>
	)
};

// name: '333',
// [0]     surname: 'Ostatochnikov',
// [0]     age: '35',
// [0]     gender: 'male',
// [0]     position: 'Frontend Developer',
// [0]     married: 'true',