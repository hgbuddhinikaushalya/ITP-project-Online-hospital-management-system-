import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import CreateAppointment from'./components/CreateAppointment';
import EditAppointment from'./components/EditAppointment';
import Home from'./components/Home';
import NavBar from'./components/NavBar';
import AppointmentDetails from'./components/AppointmentDetails';
// import image5 from './image5.jpg'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
       <div className="container">
         <NavBar/>
         <Route path="/" exact component={Home}></Route>
         <Route path="/add" component={CreateAppointment}></Route>
         <Route path="/edit/:id" component={EditAppointment}></Route>
         <Route path="/appointment/:id" component={AppointmentDetails}></Route>

         </div>
         </div>
         </BrowserRouter>
    

    
    )
  }
}


