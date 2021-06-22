/* eslint-disable import/no-anonymous-default-export */
import React, { createContext, useState, useEffect } from 'react';

import { LoopCircleLoading } from 'react-loadingg';

import userService from '../services/userService';

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  /*
    ! React hook version of componentDidMount()
    */
	useEffect(() => {
		userService
			.isAuthenticated()
			.then((data) => {
				if (data.isAuthenticated) {
					setUser(data.user);
					setIsAuthenticated(data.isAuthenticated);
					setLoaded(true);
					
				} else {
					setUser('');
					setIsAuthenticated(false);
					setLoaded(true);
					
				}
			})
			.catch((err) => {
				console.log(err);
				setLoaded(true);
			});
	}, [isAuthenticated]);
	return (
		<>
			{!loaded ? (
				<LoopCircleLoading size="large" color="red"/>
			) : (
				<AuthContext.Provider
					value={{
						user,
						setUser,
						isAuthenticated,
						setIsAuthenticated,
						loaded,
						setLoaded,
					}}
				>
					{children}
				</AuthContext.Provider>
			)}
		</>
	);
};