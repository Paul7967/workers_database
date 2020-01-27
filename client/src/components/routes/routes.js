import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AddWorker from '../pages/add-worker';
import About from '../pages/about';
import Workers from './../pages/workers';
import Navbar from '../navbar';

export const useRoutes = () => {
	return (
		<Fragment>
			<Navbar />
			<div className="container pt-4">
				<Switch>
					<Route path="/" exact component={Workers} />
					<Route path="/workers" exact component={Workers} />
					<Route path="/addworker" component={AddWorker} />
					<Route path="/about" component={About} />
					<Redirect to="/" />
				</Switch>
			</div>	
		</Fragment>		
	)
}