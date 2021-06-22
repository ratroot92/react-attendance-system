import React from 'react';
import attendanceService from '../services/attendanceService';
import { AuthContext } from '../context/authContext';
import { BoxLoading } from 'react-loadingg';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import * as FaIcons from 'react-icons/fa'
import './Home.css'
export default function Home() {
	const [isMarked, setIsMarked] = React.useState(false);
	const [load, setLoad] = React.useState(false);
	const { user,isAuthenticated } = React.useContext(AuthContext);

	/** COMPONENT_DID_MOUNT START */
	React.useEffect(() => {
        if(isAuthenticated &&  user.id!==undefined){ 
		const data = { date: moment(new Date()).format('YYYY-MM-DD'), id: user.id };
		attendanceService
			.checkIfAttendanceMarked(data)
			.then((resData) => {
				setIsMarked(resData.data);
				setLoad(true);
			})
			.catch((err) => {
				console.log(err);
				setLoad(true);
			});
		return () => {
			setIsMarked(false);
			setLoad(true);
		};
    }
	}, [isAuthenticated, user.id]);
	/** COMPONENT_DID_MOUNT END */

	const markAttendance = () => {
		setLoad(false)
		const data = { date: moment(new Date()).format('YYYY-MM-DD'), id: user.id };
		attendanceService
			.markAttendance(data)
			.then((resData) => {
                if(resData.success){
                    setIsMarked(resData.data);
                    NotificationManager.success(resData.message)
					setLoad(true)
                }
                else{
                    NotificationManager.warning(resData.message);
					setLoad(true)
                }
              
			})
			.catch((err) => {
				console.log(err);
				NotificationManager.warning("something went wrong ...");
				setLoad(true)
			});
	};
	return (
		<div  className=" col-md-12 mb-auto mt-auto h-100">

			{load ? (
				<div className='h-100 d-flex flex-row justify-content-center align-items-center '>
					{isMarked ? (
						<h3 className="text-primary">Your attendance for today has been already marked</h3>
					) : (
						<div className="d-flex flex-column">
						
						<button className='btn btn-success btn-lg' onClick={markAttendance}>
						<FaIcons.FaMarker/>	Mark Attendance
						</button>
						<p>You attendance for <span className="font-weight-bold text-primary">{moment(new Date()).format('YYYY-MM-DD')}</span>  will be marked </p>
						</div>
					)}
				</div>
			) : (
				<>
					<BoxLoading />
				</>
			)}
		</div>
	);
}
