import axios from 'axios'
import React, { Component } from 'react'

export default class Register extends Component {

    state={
        designation:""
    }
    handleChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    handleSubmit = (e)=>{
        e.preventDefault()
        const acc ={...this.state};
        console.log(this.state)
        const url=`https://fir-project-5fdbd-default-rtdb.firebaseio.com//Accounts.json`;
        axios.post(url,acc).then((resp)=>{
            if(resp.status === 200)
            {
     this.props.history.push("/show");
                this.setState({
                   designation:""
                });
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
                <div className="card text-white bg-secondary text-center" style={{padding:'50px',width:'100%',height:'665px'}} >
                <div  className="container col-4">
                       <h1>Registration</h1>
                  <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                      <label ntmlfor="designation">Designation</label>
                         <input type="text" className="form-control" id="designation" name="designation" value={this.state.designation} onChange={this.handleChange} placeholder="designation" />
                     </div>
                    <div className="form-group">
                      <label ntmlfor="company">Company</label>
                         <input type="text" className="form-control" id="company" name="company" value={this.state.company} onChange={this.handleChange} placeholder="company" />
                     </div>
                        <div className="form-group">
                      <label ntmlfor="working from">Working From</label>
                         <input type="text" className="form-control" id="workingfrom" name="workingfrom" value={this.state.workingfrom} onChange={this.handleChange} placeholder="workingfrom" />
                     </div>
                         <div className="form-group">
                      <label ntmlfor="working till">Working Till</label>
                         <input type="text" className="form-control" id="workingtill" name="workingtill" value={this.state.workingtill} onChange={this.handleChange} placeholder="workingtill" />
                     </div>
                         <div className="form-group">
                      <label ntmlfor="city">City</label>
                         <input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleChange} placeholder="city" />
                     </div>
                         <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                  </div>
                  </div>
        )
    }
}