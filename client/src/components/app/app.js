import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./app.sass";
import { useRoutes } from './../routes/routes';

const App = () => {
	const isAuthenticated = true;
	const routes = useRoutes(isAuthenticated);
	return (
		<Router>
			{routes}
		</Router>
	)
}

export default App;


