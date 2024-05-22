import React, { Component} from 'react';
import axios from 'axios';

export default class AppointmentDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            appointment:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/appointment/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    appointment:res.data.appointment

                });

                console.log(this.state.appointment);
            }
        });

    }

    render() {

        const {name,age,address,contactNo,reason,date} = this.state.appointment;

        return (
            
           <div style={{marginTop:'40px'}}>
               <h2>--- Details of the Appointments---</h2>
               &nbsp;
           <h3>{name}</h3>
           <hr/>


           <dl className="row">
               <dt className="col-sm-3">Age</dt>
               <dd className="col-sm-9">{age}</dd>

               <dt className="col-sm-3">Address</dt>
               <dd className="col-sm-9">{address}</dd>

               <dt className="col-sm-3">Contact No</dt>
               <dd className="col-sm-9">{contactNo}</dd>

               <dt className="col-sm-3">Reason</dt>
               <dd className="col-sm-9">{reason}</dd>

               <dt className="col-sm-3">Date</dt>
               <dd className="col-sm-9">{date}</dd>

               




           </dl>
               
            
            
           </div>
        )
    }
}