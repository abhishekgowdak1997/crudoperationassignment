import axios from 'axios'
import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
export default class Accounts extends Component {
    state={
        Accounts:[],
        show:false,
        user:"",

    } 
    // get data
    componentDidMount() {
        console.log(" ")
        axios.get(`https://fir-project-5fdbd-default-rtdb.firebaseio.com/Accounts.json`).then((res)=>{
        let fetchAccounts=[]
          for(const key in res.data)
          {
              fetchAccounts.push({
                  id:key,
                  ...res.data[key]
              })
          }
          console.log(fetchAccounts)
          this.setState({
              Accounts:fetchAccounts
          })
        }).catch((err)=>{
            console.log(err)
        })
    }


// delete method
handleDelete = (Account) =>{
 axios.delete(`https://fir-project-5fdbd-default-rtdb.firebaseio.com/Accounts/${Account.id}.json`).then((resp)=>{
   console.log("delete")

   const updateAccounts = this.state.Accounts.filter((acc)=>{
     return acc.id !== Accounts.id ? acc : null;
   })
   this.setState({
     Accounts:updateAccounts,
   })
 }).catch((err)=>{
   console.log(err)
 })
}
 
// update method

    handleClose=()=>{
      this.setState({
        show:false
      })
    }

    handleChange =(e)=>{
      this.setState({
          [e.target.name]: e.target.value
      })
  }
updateRecord =(acc) =>{
  const {designation,company,workingfrom,workingtill,city,id} =acc;
  this.setState({
   id:id,
    designation:designation,
    company:company,
    workingfrom:workingfrom,
    workingtill:workingtill,
    city:city,
  
    show:true
  })
}

updateAccounts =()=>
{
  const url =`https://fir-project-5fdbd-default-rtdb.firebaseio.com/Accounts/${this.state.id}.json`
  const {designation,company,workingfrom,workingtill,city}=this.state
  const Account ={
    designation:designation,
    company:company,
    workingfrom:workingfrom,
    workingtill:workingtill,
    city:city
  
  }
  axios.put(url,Account).then((res)=>{
    console.log(res.status);
    this.setState({
      show:false
    })
  }).catch((err)=>{
    console.log(err)
    
  })
}
    
    render() {
        return (                
                        <div  className="card bg-secondary text-center" style={{padding:'50px',width:'100%',height:'665px'}}>
                        <table className=" table table-info">
                        <thead className="bg-danger" >
                          <tr>
                            <th scope="col">SL.NO</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Company</th>
                            <th scope="col">Working From</th>
                            <th scope="col">Working Till</th>
                            <th scope="col">City</th>
                            <th scope="col">DELETE</th>
                            <th scope="col">UPDATE</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.Accounts.map((data,index)=> {
                                return (
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{data.designation}</td>
                                    <td>{data.company}</td>
                                    <td>{data.workingfrom}</td>
                                    <td>{data.workingtill}</td>
                                    <td>{data.city}</td>
                                
                                   <td> <button className="btn btn-danger" onClick={()=>{this.handleDelete(data)}} >DELETE</button></td>
                                  <td>  <button  className="btn btn-primary" onClick={()=>{
                                    this.updateRecord(data)
                                    }}>UPDATE</button></td>
                                    </tr>
                                )   
                            })
                        }
                        </tbody>
                      </table>

<Modal show={this.state.show} 
animation={false}
onHide={this.handleClose} >
  <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  <div className="container" >
<form onSubmit={this.handleSubmit} >
<div className="form-group">
 <label ntmlfor="designation">Designation</label>
    <input type="text" className="form-control" id="designation" name="designation" value={this.state.designation} onChange={this.handleChange} placeholder="designation" />
</div>
<div className="form-group">
 <label ntmlfor="company">Company</label>
    <input type="text" className="form-control" id="company" name="company" value={this.state.company} onChange={this.handleChange} placeholder="company" />
</div>
<div className="form-group">
 <label ntmlfor="working from">Working From</label>
    <input type="text" className="form-control" id="workingfrom" name="workingfrom" value={this.state.workingfrom} onChange={this.handleChange} placeholder="working from" />
</div>
<div className="form-group">
 <label ntmlfor="working till">Working Till</label>
    <input type="text" className="form-control" id="workingtill" name="workingtill" value={this.state.workingtill} onChange={this.handleChange} placeholder="workingtill" />
</div>
<div className="form-group">
 <label ntmlfor="city">City</label>
    <input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleChange} placeholder="city" />
</div>
   </form>
</div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.handleClose} >Close</Button>
    <Button variant="primary" onClick={this.updateAccounts} >Save changes</Button>
  </Modal.Footer>
</Modal>

 </div>
        );
    }
}