import React, { Component} from 'react';
import axios from 'axios'

export default class CreateAppointment extends Component {

    constructor(props){
        super(props);
        this.state={
            name:"",
            age:"",
            address:"",
            contactNo:"",
            reason:"",
            date:"",
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
        
        axios.post("http://localhost:8000/appointment/save",data).then((res) =>{
            alert("Added Successfully");
            if(res.data.success){
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
    

    

    render() {
        return (
           <div className="col-md-6 mt-4 mx-auto">
               <h1 className="h3 mb-3 font-weight-normal">Add New Appointment</h1>
                  <form className="needs-validation" noValidate>
                      <div className="form-group" style={{marginBottom:'15px'}}>
                          <label style={{marginBottom:'5px'}}>Name</label>
                          <input type="text"
                         className="form-control"
                         name="name" required
                         placeholder="Enter name"
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
                          pattern="[A-Za-z]"
                          value={this.state.reason}
                          onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                          <label style={{marginBottom:'5px'}}>Date</label>
                          <input type="text"
                          className="form-control"
                          name="date" required
                          placeholder="Enter Date"
                          value={this.state.date}
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
