const pool = require("../config/mysql.pool");
const bcrypt = require("bcrypt");
const attendanceModel=require('./attendance.model')
const UserModel = {
	/*
	  will return  username  if username exists
	  */

	//Asynchronous Function
	hashPassword: async function (password) {
		return new Promise((resolve, reject) => {
			bcrypt.hash(`${password}`, 10, function (err, hashedPassword) {
				if (err) return reject(null, err);
				return resolve(hashedPassword, null);
			});
		});
	},


	userNameExist: (username) => {

		return new Promise((resolve, reject) => {
		
			pool.query(`SELECT username FROM user WHERE username='${username}'  `, (err, result) => {
				if (err) { return reject(err) }
				console.log('====================================');
				console.log(result);
				console.log('====================================');
				if (result.length > 0) {
					return resolve(true);
				} else {
					return resolve(false);
				}
			},
			);
		});
	},

	userEmailExist: (email) => {
		return new Promise((resolve, reject) => {
			console.log('====================================');
			console.log(`SELECT email FROM user WHERE email='${email}' LIMIT 1`);
			console.log('====================================');
			pool.query(`SELECT email FROM user WHERE email='${email}' LIMIT 1 `, (err, result) => {
				console.log('====================================');
				console.log(result);
				console.log('====================================');
				if (result.length > 0) {
					return resolve(true);
				} else {
					return resolve(false);
				}
			});
		});
	},
	getUserByID: (userId) => {
		return new Promise((resolve, reject) => {
			pool.query(`SELECT * FROM user WHERE id='${userId}' LIMIT 1  `, (err, result) => {
				if (result.length > 0) {
					return resolve(result[0]);
				} else {
					return resolve(false);
				}
			});
		});
	},
	getUserByUsername: async function (username) {
		return new Promise(async (resolve, reject) => {
			dbResponse = await pool.query(`SELECT * FROM user WHERE username='${username}' LIMIT 1 `);
			if (dbResponse.length > 0) {
				console.log('*** - User Model -- getUserByUsername --if - ***  ');
				return resolve(dbResponse);
			} else {
				console.log('*** - User Model -- getUserByUsername --else - ***  ');
				return reject('No account with provided username ....');
			}
		});
	},
	getUserByEmail: (email) => {
		return new Promise(async (resolve, reject) => {
			let queryBuilder = `SELECT * FROM user WHERE email='${email}' LIMIT 1 `;
			pool.query(queryBuilder, (err, result) => {
				if (err) {
					console.log(err);
					return reject(err)
				}
				else {
					if (result.length > 0) {
						return resolve(result[0])
					}
					else {
						return resolve(true)
					}
				}
			})
		});
	},
	insertUser: (UserObject) => {
		return new Promise((resolve, reject) => {
			let { username, email, password } = UserObject;
			UserModel.hashPassword(password).then((hashedPassword) => {
				if (hashedPassword) {
					let queryBuilder = `INSERT INTO user( username, email, password) VALUES ('${username}','${email}','${hashedPassword}')`;
					pool.query(queryBuilder, (err, results) => {
						console.log('====================================');
						console.log(results);
						console.log('====================================');
						if (err) {
							console.log(err);
							return reject(err)
						}
						else {
							if (results.affectedRows > 0) {
								UserModel.getUserByID(results.insertId).then((user) => {
									attendanceModel.createMonthAttendence(results.insertId).then((res)=>{
										if(res){
											return resolve(user)
										}
										else{
											return reject(err)
										}
									})
								}).catch((err) => {
									return reject(err)
								})

							}
							else {
								return resolve(false)
							}
						}
					})
				}
			});
		})
	},
	deactivateUser: async function (UserId) {
		return new Promise(async (resolve, reject) => {
			/**
			 * Delete user is actually chaning its status
			 * 0 ==> active
			 * 1 ==> in-active  
			 */
			pool.query(`UPDATE user SET status=1 where id=${UserId}`, (err, result) => {
				if (err) { console.log(err); return reject(err) };
				if (result.changedRows === 1) {
					UserModel.getUserByID(UserId).then((user) => {
						if (user) return resolve(user);
						return resolve(false)
					});
				} else {
					return resolve(false);
				}
			});
		});
	},
	activateUser: async function (UserId) {
		return new Promise(async (resolve, reject) => {
			/**
			 * Delete user is actually chaning its status
			 * 0 ==> active
			 * 1 ==> in-active  
			 */
			pool.query(`UPDATE user SET status=0 where id=${UserId}`, (err, result) => {
				if (err) { console.log(err); return reject(err) };
				if (result.changedRows === 1) {
					UserModel.getUserByID(UserId).then((user) => {
						if (user) return resolve(user);
						return resolve(false)
					});
				} else {
					return resolve(false);
				}
			});
		});
	},
	editUser: function (UserObject) {
		let { id, username, email, status, role, mobile } = UserObject;
		status = parseInt(status, 10);
		id = parseInt(id, 10);
		role = parseInt(role, 10);
		return new Promise(async (resolve, reject) => {
			// let hashedPassword = this.hashPassword(password).then((hashedPassword) => hashedPassword);
			let queryBuilder = `UPDATE IGNORE user SET mobile='${mobile}', username='${username}',email='${email}',status=${status},roleId_FK=${role} WHERE id=${id}`;
			executeQuery = pool.query(queryBuilder, (err, result) => {
				if (err) {
					return resolve(false);
				}
				if (result.changedRows === 1) {
					UserModel.getUserByID(id).then((user) => {
						if (user) return resolve(user);
					});
				} else {
					return resolve(false);
				}
			});
		});
	},

	comparePassword: function (password, hashedPassword, user, done) {

		bcrypt.compare(password, hashedPassword, (err, isMatch) => {
			if (err) {
				console.log('***-comparePassword (if)-***');
				return done(err);
			} else {
				//hashed password and password not matched
				if (!isMatch) {
					console.log('***-comparePassword if (!isMatch)-***');
					return done(null, false);
				} else {
					//here (this) is whole user object
					console.log('***-comparePassword (else)-***');
					return done(null, {
						id: user.id,
						username: user.username,
						email: user.email,
						status: user.status,
						role: user.roleId_FK,
					});
				}
			}
		});

	},
};

module.exports = UserModel;