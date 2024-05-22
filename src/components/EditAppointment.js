import React, { Component } from 'react';
import axios from 'axios'

export default class EditAppointment extends Component {


    constructor(props){
        super(props);
        this.state={
            name:"",
            age:"",
            address:"",
            contactNo:"",
            reason:"",
            date:""
        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{

        e.preventDefault();
        const id = this.props.match.params.id;


        const {name,age,address,contactNo,reason,date} = this.state;

        const data ={
            name:name,
            age:age,
            address:address,
            contactNo:contactNo,
            reason:reason,
            date:date
            
        }

        console.log(data)
        
        axios.put(`http://localhost:8000/appointment/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert(" Updated Successfully")
                this.setState({
                    name:"",
                    age:"",
                    address:"",
                    contactNo:"",
                    reason:"",
                    date:""
                    
                })
                
            }
        })

        
    
    }

   
retriveveAppointments(){

        axios.get("./appointment").then(res =>{

          if (res.data.success){

            this.setState({

                appointments:res.data.existingAppointment

            });

    

            console.log(this.state.appointment)

          }

        });

      };


    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/appointment/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                  name:res.data.appointment.name,
                  age:res.data.appointment.age,
                  address:res.data.appointment.address,
                  contactNo:res.data.appointment.contactNo,
                  reason:res.data.appointment.reason,
                  date:res.data.appointment.date,

                });

                console.log(this.state.appointment);
                      this.retriveveAppointments();       
            }
        });

    }

    render() {
        return (
            <div className="col-md-6 mt-4 mx-auto">
               <h1 className="h3 mb-3 font-weight-normal">Update Appointment</h1>
                  <form className="needs-validation" noValidate>
                      <div className="form-group" style={{marginBottom:'15px'}}>
                          <label style={{marginBottom:'5px'}}>Name</label>
                          <input type="text"
                         className="form-control"
                         name="name" required
                         placeholder="Enter Name"
                         value={this.state.name}
                         onChange={this.handleInputChange}/>
                          
                        </div>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Age</label>
                        <input type="text"
                         className="form-control"
                         name="age" required
                         placeholder="Enter Age"
                         value={this.state.age}
                         onChange={this.handleInputChange}/>
                         </div>


                        

                      

                        <div className="form-group" style={{marginBottom:'15px'}}>
                          <label style={{marginBottom:'5px'}}>Address</label>
                          <input type="text"
                          className="form-control"
                          name="address" required
                          placeholder="Enter Address"
                          value={this.state.address}
                          onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                          <label style={{marginBottom:'5px'}}>Contact No</label>
                          <input type="text"
                          className="form-control"
                          name="contactNo" required
                          placeholder="Enter Contact No"
                          pattern="[A-Za-z]"
                          value={this.state.contactNo}
                          onChange={this.handleInputChange}/>
                        </div>
                        
                         <div className="form-group" style={{marginBottom:'15px'}}>
                          <label style={{marginBottom:'5px'}}>Reason</label>
                          <input type="text"
                          className="form-control"
                          name="reason" required
                          placeholder="Enter Reason"
                          value={this.state.reason}
                          onChange={this.handleInputChange}/>
                        </div>



                        

                        <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i>
                            &nbsp; Save
                            </button>

                    </form>        

                    &nbsp;
           </div>
        )
    }


    }
