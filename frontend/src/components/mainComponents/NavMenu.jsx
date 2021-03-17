import React  from "react";
import {useState} from "react";
import { Button, Menu , message } from "antd";
import { Link } from "react-router-dom";
import "../../App.css";
import Login from "../forms/Login"
import {API} from '../API/Api'
function NavMenu() {
  const key = 'updatable';
  const openMessage = () => {
    message.loading({ content: 'Loading...', key});
    setTimeout(() => {
      message.success({ content: 'You are successfully logout!', key, duration: 2 });
       }, 1000);
  };
  const [auth,setAuth] = useState({
    currentUser : null,
    isLogged : false
  })
  return (
   <Menu
      mode="horizontal"
      className="navMenu"
    >
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="claendar">
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
     {auth.isLogged && auth.currentUser.email != "as@gmail.com" && auth.currentUser.email.endsWith("techmen.com")?
     <Menu.Item key="profile">
        <Link to="/profiletechmen">Profile</Link>
    </Menu.Item>
    : 
      null
   }
    {auth.isLogged && auth.currentUser.email != "as@gmail.com" && !auth.currentUser.email.endsWith("techmen.com")?
     <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
    </Menu.Item>
    : 
      null
   }
   {auth.isLogged && auth.currentUser.email == "as@gmail.com"?
     <Menu.Item key="admin">
        <Link to="/admin">Admin</Link>
    </Menu.Item>
    : 
      null
   }
    <Menu.Item key="about">
        <Link to="/about">About</Link>
      </Menu.Item>
   {!auth.isLogged ? 
      <Menu.Item key="Login">
        <Login setAuth = {setAuth}/> 
      </Menu.Item>
      :
      <Menu.Item key="Login">
       <Button  className="loginBtn"
        type="primary" 
        onClick={() => { API.logout(); setAuth({  currentUser : null,
          isLogged : false}); openMessage()}}
        >  <Link to="/">Logout</Link></Button>
      </Menu.Item>
   }
    </Menu>
  );
}
export default NavMenu;