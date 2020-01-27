import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
	return(
		<nav className="navbar navbar-expand-md navbar-dark bg-primary">
			<NavLink exact className="navbar-brand" to="/">Workers database</NavLink>
			
			{<div className="navbar-collapse ">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink className="nav-link" to="/workers">Workers</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/addworker">Add worker</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/about">About</NavLink>
					</li>
				</ul>
			</div>}
		</nav>
	)
}