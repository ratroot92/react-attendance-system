import axios from 'axios';


const userService={
    login:(user)=>{
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`,user,{
            headers:{
                'Content-Type':'application/json'
            },
            credentials: "include",
        }).then(response=>{
            if(response.status!==401)return response.data
            return response
        }).catch(err=>{
            console.log("%cError => userService --login ","font-size:12px;font-weight:bold;color:red;");
            console.log(err);
            return err.response
        })
    },
    isAuthenticated: () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/user/is-authenticated`,{
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.status !== 401) {
              return response.data;
            }
            return { isAuthenticated: false, user: { username: "", role: "" } };
          })
          .catch((error) => {
            console.log(error);
            return { isAuthenticated: false, user: { username: "", role: "" } };
          });
      },
      logout: () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/user/logout`,{
          withCredentials: true,
        })
          .then((data) => data.data)
          .catch((err) => err);
      },
      userExist: (email) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/user/email/exist`,email,
        {
          withCredentials: true,
        })
          .then((data) => data.data)
          .catch((err) => err);
      },
}

export default userService;