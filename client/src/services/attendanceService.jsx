import axios from 'axios';


const attendanceService={
    getAttendanceByEmail:(email)=>{
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/attendance/get-by-email`,email,{
            headers:{
                'Content-Type':'application/json'
            },
            credentials: "include",
        }).then(response=>{
            if(response.status!==401)return response.data
            return response
        }).catch(err=>{
            console.log("%cError => attendanceService --login ","font-size:12px;font-weight:bold;color:red;");
            console.log(err);
            return err.response
        })
    },
    getAllAttendance:()=>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/attendance/get-all`,{
            headers:{
                'Content-Type':'application/json'
            },
            credentials: "include",
        }).then(response=>{
            if(response.status!==401)return response.data
            return response
        }).catch(err=>{
            console.log("%cError => attendanceService --login ","font-size:12px;font-weight:bold;color:red;");
            console.log(err);
            return err.response
        })
    },
    markAttendance:(data)=>{
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/attendance/mark-attendance`,data,{
            headers:{
                'Content-Type':'application/json'
            },
            credentials: "include",
        }).then(response=>{
            if(response.status!==401)return response.data
            return response
        }).catch(err=>{
            console.log("%cError => attendanceService --login ","font-size:12px;font-weight:bold;color:red;");
            console.log(err);
            return err.response
        })
    },
    checkIfAttendanceMarked:(data)=>{
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/attendance/validate-attendance`,data,{
            headers:{
                'Content-Type':'application/json'
            },
            credentials: "include",
        }).then(response=>{
            if(response.status!==401)return response.data
            return response
        }).catch(err=>{
            console.log("%cError => attendanceService --login ","font-size:12px;font-weight:bold;color:red;");
            console.log(err);
            return err.response
        })
    },

}

export default attendanceService;