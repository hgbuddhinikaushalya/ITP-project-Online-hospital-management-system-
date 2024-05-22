import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default class Home extends Component {
constructor(props){
  super(props);

  this.state={
    appointments:[]
  };

}


componentDidMount(){
  this.retriveveAppointments();

}

retriveveAppointments(){
  axios.get("http://localhost:8000/appointments").then(res =>{
    if(res.data.success){
      this.setState({
        appointments:res.data.existingAppointments
      });

      console.log(this.state.appointments)
    }


  });
}

//report

genPDF =() => {

  const doc = new jsPDF()
  doc.setFontSize(20);
  doc.text("Appointments Details List", 50,10);
  doc.autoTable({
  html: '#content'

})

doc.setFontSize(12);
doc.text("Auto Hub Service Station - ", 10,272);
doc.setFontSize(10);
doc.text(" Appointments Details Report", 52,272);
doc.save('Appointments Details.pdf')

}

//delete function

onDelete = (id) =>{

  axios.delete(`/appointment/delete/${id}`).then((res) =>{
    alert("Deleted Successfully");
    this.retriveveAppointments();
  })
}

//Search Appointments

filterData(appointments,searchKey){

  const result = appointments.filter((appointment) =>
  appointment.name.toLowerCase().includes(searchKey)||
  appointment.reason.toLowerCase().includes(searchKey)
)

this.setState({appointments:result})
}


handleSearchArea = (e) =>{

  const searchKey = e.currentTarget.value;

  axios.get("http://localhost:8000/appointments").then(res =>{
    if(res.data.success){
     
       this.filterData(res.data.existingAppointments,searchKey)
      
    }
  });

}
  render() {
    return (
     

      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h2>All Appointments</h2>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="search"
            name="searchQuery"
            onChange={this.handleSearchArea}>

            </input>
          </div>
        </div>
       <table className="table table-hover" style={{marginTop:'40px'}} id="content">
         <thead>
           <tr>
           <th scope="col">No</th>
           <th scope="col">Name</th>
           <th scope="col">Age</th>
           <th scope="col">Address</th>
           <th scope="col">Contact No</th>
           <th scope="col">Reason</th>
           <th scope="col">Date</th>
           <th scope="col">Action</th>
           </tr>
         </thead>
         <tbody>
           {this.state.appointments.map((appointments,index) =>(
             <tr key={index}>

               <th scope="row">{index+1}</th>
               <td>
                   <a href={`/appointment/${appointments._id}`} style={{textDecoration:'none'}}>
                   {appointments.name}
                   </a>
                   </td>

               <td>{appointments.age}</td>
               <td>{appointments.address}</td>
               <td>{appointments.contactNo}</td>
               <td>{appointments.reason}</td>
               <td>{appointments.date}</td>
               
               <td>
                 <a className="btn btn-warning" href={`/edit/${appointments._id}`}>
                   <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(appointments._id)}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </a>

               </td>
              </tr>

           ))} 
           
         </tbody>

       </table>
       

       <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Add New Appointments</a></button>
       &nbsp;

       
       <button type="button" className="btn btn-danger" style={{width:'250px',position:"absolute",

right:"150px"}}><a href="#" onClick={() =>this.genPDF()} style={{textDecoration:'none', color:'white'}}> GENERATE REPORT</a></button>
    

      </div>
      

    )
  }
}
