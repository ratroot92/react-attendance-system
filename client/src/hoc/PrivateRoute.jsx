import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
	const { isAuthenticated } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!isAuthenticated) {
					return <Redirect to={{ pathname: '/', state: { from: props.location } }} {...props} />;
				}
					return <Component {...props} />;
				
			}}
		/>
	);
};

export default PrivateRoute;
