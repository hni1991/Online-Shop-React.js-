import React from 'react';
import './Register.css';
import{url}from '../../url'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            
        }
    }
    //fetch function for all modul's
    sendData = (url, data)=> {
        console.log(url);
        return fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
    
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json();
            });
    }

     Alert = (page, color, text) => {
        console.log('Alert')
        if (page === 'login') {
            let loginAlert = document.getElementById('alertL')
            if (color === 'green') {
                loginAlert.style.visibility = "visible "
                loginAlert.className = 'alert inv alert-success'
                loginAlert.innerHTML = text
            } else {
                loginAlert.style.visibility = "visible"
                loginAlert.className = 'alert inv alert-danger'
                loginAlert.innerHTML = text
            }
        } else if (page === 'register') {
            let registerAlert = document.getElementById('alertR')
            if (color === 'green') {
                registerAlert.style.visibility = "visible "
                registerAlert.className = 'alert inv alert-success'
                registerAlert.innerHTML = text
            } else {
                registerAlert.style.visibility = "visible"
                registerAlert.className = 'alert inv alert-danger'
                registerAlert.innerHTML = text
            }
        }
    }
    
     register = (e) => {
        let firstName =document.getElementById('regFname').value
        let lastName = document.getElementById('regLname').value
        let email = document.getElementById('regEmail').value
        let password = document.getElementById('regPass').value
        let Tel = document.getElementById('regTel').value
        let address = document.getElementById('regAddress').value
        let plzOrt = document.getElementById('regpo').value
    
        if (firstName.length === 0) {
           this.Alert('register', 'red', 'Please full all field')
        } else
        if (lastName.length === 0) {
            this.Alert('register', 'red', 'Please full all field')
        } else
        if (email.length === 0) {
            this.Alert('register', 'red', 'Please full all field')
        } else
        if (password.length === 0) {
            this.Alert('register', 'red', 'Please full all field')
        } else
        if (Tel.length === 0) {
            this.Alert('register', 'red', 'Please full all field')
        } else
        if (address.length === 0) {
            this.Alert('register', 'red', 'Please full all field')
        } else
        if (plzOrt.length === 0) {
            this.Alert('register', 'red', 'Please full all field')
        } else {
            let obj = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phoneNumber: Tel,
                street: address,
                postCode: plzOrt
            }
            this.sendData(url+'/register', obj)
                .then(data => {
                    console.log(data)
                    if (data.message === 'Ok') {
                       this.Alert('register', 'green', 'check your email')
    
                    } else {
                        this.Alert('register', 'red', data.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.Alert('register', 'red', 'in this time we have some Technical Problem please Try later')
    
                })
        }
    }

    render(){
        return(
            <div>
               <div className="container registerArea ">
<br/>
<div className="login-wrap goldenline">
    <form >
        <div className="row d-flex justify-content-center ">
            <h5>Register</h5>
        </div>
<br/>
<div id="alertR"className="alert inv" role="alert">
</div>
<br/>
        <div className="form-group row ">
            <label className="col-sm-3 col-form-label">Fist name </label>
            <div className="col-sm-9">
                <input type="text" className="form-control" id="regFname" placeholder="Username" />
            </div>
        </div>
        <div className="form-group row">
            <label  className="col-sm-3 col-form-label">Last name </label>
            <div className="col-sm-9">
                <input type="text" className="form-control" id="regLname" placeholder="Last name" />
            </div>
        </div>
        <div className="form-group row">
                <label  className="col-sm-3 col-form-label">Email <span
                    style={{color: "red"}}>*</span></label>
                <div className="col-sm-9">
                    <input type="email" className="form-control" id="regEmail" placeholder="Email" required />
                </div>
            </div>
            <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Password <span
                        style={{color: "red"}}>*</span></label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" id="regPass" placeholder="Password" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Phone Number <span
                        style={{color: "red"}}>*</span></label>
                    <div className="col-sm-9">
                        <input type="number" className="form-control" id="regTel" placeholder="Phone Number" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Address <span
                        style={{color: "red"}}>*</span></label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="regAddress" placeholder="Address" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Plz / Ort <span
                        style={{color: "red"}}>*</span></label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="regpo" placeholder="Plz / Ort" required />
                    </div>
                </div>
            <br/>

        <div className="d-flex justify-content-center btnCss">
            <button type="button" onClick={()=>this.register()} className="btn btn-outline-dark">Register</button>
        </div><br/>
        <div className="d-flex justify-content-center forget">
            Have you already account ? <a href="./login.html">  &nbsp;Click here</a>
        </div>
    </form>
</div>
</div> 
            </div>
        )
    }

}

export default Register ;