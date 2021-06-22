import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userService from "./../services/userService";
import { AuthContext } from "../context/authContext";
import * as FaIcons from 'react-icons/fa';

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  


  const onClickLogoutHandler = () => {
    userService.logout().then((data) => {
      if (data.success) {
        setUser('');
        setIsAuthenticated(false);
        console.log("LOGOUT_SUCCESSFULL");
        // props.history.push('/')
      }
    });
  };
  const authenticatedNavbar = () => {
    return (
      <>
        <li className="nav-item">  <Link className="nav-link" to="/home">Home </Link></li>
        <li className="nav-item">  <Link className="nav-link" onClick={onClickLogoutHandler}>Logout </Link></li>
   </>
    );
  };
  const unauthenticatedNavbar = () => {
    return (
      <>
              <li className="nav-item">  <Link className="nav-link" to="/">Login </Link></li>
        <li className="nav-item">  <Link className="nav-link" to="/Attendance-sheet">Attendance Sheet </Link></li>

      </>
    );
  };
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark h-100 ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
           <FaIcons.FaBrain color="yellow" size="30" style={{marginRight:'5px'}} /> Aangan Pk
          </Link>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}


          </ul>


        </div>
      </nav>

  );
};

export default Navbar;