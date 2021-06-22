const pool = require("../config/mysql.pool");
const bcrypt = require("bcrypt");
const userModel=require('../models/user.model');
const moment=require('moment')
const attendanceModel = {


    formulateAttendance:(attendanceList,user)=>{
       return attendanceList.map(i=>{
                i.username=user.username;
                i.id=user.id;
                i.email=user.email;
                 return i;
        })

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
    createMonthAttendence:(userId)=>{
        return new Promise((resolve,reject)=>{

     
        const lastThirtyDays = [...new Array(30)].map((i, idx) => moment().startOf("day").add(idx, "days").format("YYYY-MM-DD"));
        // lastThirtyDays.pop()
        // lastThirtyDays.splice(2, 0, moment(new Date()).format('YYYY-MM-DD'));
        const bulInsertion=[]
        lastThirtyDays.forEach(i=>{
                bulInsertion.push([userId,i])
        })
        pool.query(`INSERT INTO attendance (id,date) VALUES ?`,[bulInsertion],(err,result)=>{
            if(err){
                console.log(err)
                return reject(err);
            }
            else{
                if(result.affectedRows>0){
                    return resolve(true)
                }
                else{
                    return resolve(false) 
                }
            }
        })
    })
     },


	getAttendanceByEmail: (email) => {
		return new Promise((resolve, reject) => {
            attendanceModel.getUserByEmail(email).then((user)=>{
            pool.query(`SELECT * FROM attendance WHERE id=${user.id} ORDER BY date ASC
            `,(err, result) => {
					if(err){ return reject(err) }
					if (result.length > 0) {
						return resolve(attendanceModel.formulateAttendance(result,user));
					} else {
						return resolve(false);
					}
				},
			);
            })
			
		});
	},
    getAllAttendanceById: () => {
		return new Promise((resolve, reject) => {
			pool.query(`SELECT * FROM attendance ORDER BY date ASC
            '  `,(err, result) => {
					if(err){ return reject(err) }
					if (result.length > 0) {
						return resolve(result);
					} else {
						return resolve(false);
					}
				},
			);
		});
	},

    markAttendance: ({id,date}) => {
		return new Promise((resolve, reject) => {
            let queryBuilder=`UPDATE attendance SET isMarked=1 WHERE id=${id} AND date='${date}'`
			pool.query(queryBuilder,(err, result) => {
					if(err){ return reject(err) }
					if (result.affectedRows > 0) {
						return resolve(true);
					} else {
						return resolve(false);
					}
				},
			);
		});
	},
    validateAttendance: ({id,date}) => {
		return new Promise((resolve, reject) => {
            let queryBuilder=`SELECT * FROM attendance WHERE id=${id} and date='${date}' and isMarked=1`;
            console.log(queryBuilder)
			pool.query(queryBuilder,(err, result) => {
					if(err){ return reject(err) }
                    console.log(result.length)
					if (result.length > 0) {
						return resolve(true);
					} else {
						return resolve(false);
					}
				},
			);
		});
	},

	};
  


module.exports = attendanceModel;