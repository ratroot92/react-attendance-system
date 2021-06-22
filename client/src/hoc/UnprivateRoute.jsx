import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/authContext';

const UnPrivatRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuthenticated) {
					return (
						<Redirect to={{ pathname: '/home', state: { from: props.location } }}  {...props}  />
					);
				}
				return <Component {...props} />;
			}}
		/>
	);
};

export default UnPrivatRoute;