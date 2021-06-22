
import React from 'react';
import './LoginPage.css';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoopCircleLoading } from 'react-loadingg';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import userService from '../services/userService';
import './LoginPage.css';
import 'react-notifications/lib/notifications.css';
import { AuthContext } from '../context/authContext.js';
const LoginPage = () => {
	const [load, setLoad] = React.useState(true);
	const { setIsAuthenticated, setUser } = React.useContext(AuthContext);

	// 	/** COMPOENENT_DID_MOUNT && COMPONENT_DID_UNMOUNT START * */
	React.useEffect(() => {
		setLoad(true);
		return () => {
			setLoad(true);
		};
	}, [setLoad]);
	// 	/** COMPOENENT_DID_MOUNT && COMPONENT_DID_UNMOUNT END * */

	// 	/** FORM_VALIDATION START * */
	const validationSchema = yup.object().shape({
		email: yup.string().email().required('Email is required'),
		password: yup
			.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters')
			.max(14, 'Password must be at most 14 characters'),
	});
	// 	/** FORM_VALIDATION END * */

	const { register, errors, handleSubmit, reset } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: 'ahmed@admin.com',
			password: 'ahmed@123',
		},
	});

	// 	/** HANDLE FORM SUBMIT START * */
	const onSubmit = (formData) => {
		userService
			.login({ email: formData.email, password: formData.password })
			.then((resData) => {
				if (resData.status !== 401) {
					const { success, data, message } = resData;
					if (success) {
						NotificationManager.success(message);
						setUser({ username: data.username, email: data.email, status: data.status });
						setIsAuthenticated(true);
						
					} else {
						NotificationManager.warning('in valid credentails ...');
					}
				} else {
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// 	/** HANDLE FORM SUBMIT END * */

	return (
		<div className='h-100 login-wrapper'>
			{load ? (
				
				<div className='form-box'>
					<div className='header-form'>
						<h4 className='text-primary text-center'>
							<i className='fa fa-user-circle' style={{ fontSize: '110px' }}></i>
						</h4>
						<div className='image'></div>
					</div>
					<div className='body-form'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text'>
										<FaIcons.FaUser size='25' />
									</span>
								</div>

								<input
									ref={register}
									className='form-control'
									type='text'
									id='email'
									name='email'
									placeholder='email'
								/>
								{errors?.email ? (
									<small className='font-weight-bold text-danger'>{errors?.email.message}</small>
								) : (
									<></>
								)}
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text'>
										<FaIcons.FaLock size='25' />
									</span>
								</div>
								<input
									ref={register}
									className='form-control'
									type='password'
									id='password'
									name='password'
									placeholder='password'
								/>
								{errors?.password ? (
									<small className='font-weight-bold text-danger'>{errors?.password.message}</small>
								) : (
									<></>
								)}
							</div>
							<button type='submit' className='btn btn-secondary btn-block'>
								LOGIN
							</button>
							<div className='message'>
								<div>
									<input type='checkbox' /> Remember ME
								</div>
								<div>
									<Link href='#'>Forgot your password</Link>
								</div>
							</div>
						</form>
						<div className='social'>
							<Link href='#'>
								<FaIcons.FaFacebook size='25' />
							</Link>
							<Link href='#'>
								<FaIcons.FaTwitterSquare size='25' />
							</Link>
							<Link href='#'>
								<FaIcons.FaGoogle size='25' />
							</Link>
						</div>
					</div>
				</div>
				
			) : (
				<LoopCircleLoading size="large" color="red"/>
			)}
			<NotificationContainer />
		</div>
	);
};

export default LoginPage;
