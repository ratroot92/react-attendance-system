/* eslint-disable no-lone-blocks */
// /* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter , Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import AttendancePage from './pages/AttendancePage';
import PrivateRoute from './hoc/PrivateRoute';
import UnprivateRoute from './hoc/UnprivateRoute';
function App(props) {
	return (
		<div className='container-fluid h-100'>
		<BrowserRouter>
				
					{/* Navbar  */}
					<div className='row'style={{height:'10%'}}>
						<Navbar  {...props}/>
					</div>
					{/* Body  */}
					<div className='row'style={{height:'90%'}}>
						<Switch>
							<UnprivateRoute exact path='/' component={LoginPage} {...props} />
							<UnprivateRoute exact path='/Attendance-sheet' component={AttendancePage} {...props} />
							<PrivateRoute exact path='/home'{...props} component={HomePage}/>
						</Switch>
					</div>
					{/* Footer  */}
				
		</BrowserRouter>
		</div>
	);
}

export default App;