import React from 'react';
import { AuthContext } from '../context/authContext';
import { useForm } from 'react-hook-form';
import { LoopCircleLoading } from 'react-loadingg';
import MuiDataTable from 'mui-datatables';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import attendanceService from '../services/attendanceService';
import { NotificationManager } from 'react-notifications';
import * as FaIcons from 'react-icons/fa';
import './AttendancePage.css';
import userService from '../services/userService';
import { resolve } from 'path';
import moment from 'moment';

/** FORM_VALIDATION START * */
const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required('Email is required')
		.test('unique exam center name ', 'exam center  already exist....', (email) => {
			return new Promise((resolve, reject) => {
				userService
					.userExist({ email })
					.then((resData) => {
						if (resData.success) {
						
								return resolve(resData.exist);
							
						}
					})
					.catch((err) => {
						console.log(err);
					});
			});
		}),
});
/** FORM_VALIDATION END * */

export default function AttendancePage() {
	const [load, setLoad] = React.useState(false);
	const [state, setState] = React.useState([]);
	const { user } = React.useContext(AuthContext);

	const { register, handleSubmit, reset, errors } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: 'ahmed@admin.com',
		},
	});

	/** COMPONENT_DID_MOUNT START */
	React.useEffect(() => {
		setLoad(true);
		return () => {
			setLoad(true);
			setState([])
		};
	}, []);
	/** COMPONENT_DID_MOUNT START */

	/** HANDLE FORM SUBMIT START * */
	const onSubmit = (formData) => {
		setLoad(false);
		attendanceService
			.getAttendanceByEmail({ email: formData.email })
			.then((resData) => {
				if (resData.success) {
					NotificationManager.success('request successfull');
					setState(resData.data);
					setLoad(true);
				}
				setLoad(true);
			})
			.catch((err) => {
				console.log(err);
				setLoad(true);
			});
	};
	/** HANDLE FORM SUBMIT END * */
	return (
		<div className='col-md-12  attendance-page-wrapper'>
			{load ? (
				<div className='row h-100  '>
					{state && state.length === 0 ? (
						<>
							<div className='col-md-4 h-100 '></div>
							<div className='col-md-4 h-100 form-row '>
								<div className='card mt-5 '>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className='card-header text-center'>
											<span className='text-dark'>View Attendance</span>
										</div>
										<div className='card-body'>
											<label htmlFor='email' className='text-dark p-1'>
												Email
											</label>
											<input
												type='email'
												name='email'
												id='email'
												ref={register}
												className={`form-control border border-${
													errors.email ? 'danger' : 'success'
												}`}
											/>
											{errors.email ? (
												<small className='text-danger '>{errors.email.message}</small>
											) : (
												<></>
											)}
										</div>
										<div className='card-footer text-center'>
											<button type='submit' className='btn btn-sm btn-success'>
												<FaIcons.FaSearch /> View Attendance
											</button>
										</div>
									</form>
								</div>
							</div>
							<div className='col-md-4 h-100'></div>
						</>
					) : (
						<div className='col-md-12 h-100  p-5'>
							<div className='row h-100'>
								<div className='col-md-12 d-flex flex-column'>
									<div className='row'>
										<div className='col-md-6 d-flex flex-row justify-content-center align-items-center '>
										<div className="custom-badge-wrapper bg-primary">
											<span > Total Days</span>
											<span > {state.length}</span>
											</div>
										</div>

										<div className='col-md-6 d-flex flex-row justify-content-center align-items-center '>
										<div className="custom-badge-wrapper bg-success">
											<span > Total Presents </span>
											<span > {state.filter((i) => i.isMarked === 1).length}</span>
										</div>
										</div>
										<div className='col-md-6 d-flex flex-row justify-content-center align-items-center '>
										<div className="custom-badge-wrapper bg-danger">
											<span > Total Absents</span>
											<span > {state.filter((i) => i.isMarked === 0).length}</span>
										</div>
										</div>
										<div className='col-md-6 d-flex flex-row justify-content-center align-items-center '>
										<div className="custom-badge-wrapper bg-warning">
											<span > Percentage %</span>
											<span >
												{' '}
												{Math.floor((state.filter((i) => i.isMarked === 1).length / state.length) * 100)}%
											</span>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-12 mt-5'>
									<MuiDataTable
										title={`${state[0]?.username} Attendance Sheet `}
										data={state || []}
										columns={[
											{
												name: 'email',
												label: 'Email',
												options: {
													display: 'true',
												},
											},
											{
												name: 'id',
												label: 'Id',
												options: {
													display: 'false',
												},
											},
											
											{
												name: 'username',
												label: 'Username',
												options: {
													display: 'true',
												},
											},

											{
												name: 'date',
												label: 'Date',
												options: {
													display: 'true',
													customBodyRender: (value) => (
													<>{moment(value).format("MMM Do YY")}</>
													),
												},
											},
											{
												name: 'date',
												label: 'Day',
												options: {
													display: 'true',
													customBodyRender: (value) => (
													<>{moment(value).format("dddd")}</>
													),
												},
											},

											{
												name: 'isMarked',
												label: 'Attendance',
												options: {
													display: 'true',
													customBodyRender: (value) => (
														<span
															className={`font-weight-bold text-${value ? 'success' : 'danger'}`}
														>
															{value === 1 ? 'Present' : 'Absent'}
														</span>
													),
												},
											},
										]}
									/>
								</div>
								<div className='text-center col-md-12'>
									<button
										type='button'
										className='btn btn-warning text-dark font-weight-bold btn-lg'
										onClick={() => setState([])}
									>
										<FaIcons.FaSearch /> View Again
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			) : (
				<LoopCircleLoading size='large' color='red' />
			)}
		</div>
	);
}
