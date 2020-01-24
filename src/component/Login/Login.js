import React from 'react';
import './Login.css';
import{url}from '../../url'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state ={

        }
        this.vis = false
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
    
     login = () => {
        let username = document.getElementById('loginMail').value;
        let password = document.getElementById('loginPassword').value;
        if (username.length === 0) {
            this.Alert('login', 'red', 'Please full all field')
        } else
        if (password.length === 0) {
            this.Alert('login', 'red', 'Please full all field')
        } else {
            let user = {
                email: username,
                password: password
            }
            this.sendData(url+'/login', user)
                .then(data => {
                    console.log(data)
                    if (data.message === 'Ok') {
                        if(data.data.isAdmin ===1){
                            window.location.href = '/admin.html'
    
                        }else{
                            window.location.href = '/'
                        }
                       // window.location.href = '/'
    
                    } else {
                        this.Alert('login', 'red', data.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.Alert('login', 'red', 'Technical Problem')
    
                })
        }
    }
    
     changePass() {
        let mainEmail = document.getElementById('Femail').value
        this.sendData(url+'/passwordChangeRequest', {email : mainEmail})
        .then(data => { 
            console.log(data)
            if (data.message === 'Ok') {
                this.Alert('login', 'green', 'Please check zour E-mail')
            } else {
                this.Alert('login', 'red', data.data)
            }
        })
        .catch(error =>{
            console.log(error)
        })
      }
     
       Freq = () =>{
          console.log(this.vis)
          let holder = document.getElementById('FPholder')
          this.vis = !this.vis
          if(this.vis){
            holder.classList.remove('d-none')
            holder.classList.add('d-flex')
            console.log(holder.style.display)
          }
          else
          {
            holder.classList.add('d-none')
            holder.classList.remove('d-flex')
          }
      }

    render(){
        return(
            <div>
                <br/>
                <div className="container loginArea ">
        <div className="login-wrap goldenline">
            <form>
                <div className="row d-flex justify-content-center">
                    <h5>Login</h5>

                </div>
                <br/>
                <div id="alertL"className="alert inv" role="alert">
                  </div>
                <br/>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Username <span
                            style={{color: "red"}}>*</span></label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="loginMail" placeholder="Username"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Password <span
                            style={{color: "red"}}>*</span></label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" id="loginPassword" placeholder="Password"/>
                    </div>
                </div>
                <br/>
                <div className="d-flex justify-content-center btnCss">
                    <button type="button" onClick={()=>this.login()} className="btn btn-outline-dark">Login</button>
                </div><br/>
                <div className="d-flex justify-content-center forget">
                    <span onClick={()=>this.Freq()}>Forget your Password ?</span>
                </div>
                <div className="d-flex justify-content-center forget">
                       If you don't have an account ? &nbsp;<a href="./register.html">Click here </a>
                    </div>

                    <div className=" justify-content-center forget m-5 d-none"  id="FPholder">
                        <input type="email" id="Femail" className="form-control col-6" placeholder="Enter Your email address"/>
                        <button onClick={()=>this.changePass()} type="button" className="btn btn-outline-info"> Send Email</button>
                    </div>
            </form>
        </div>
    </div>
            </div>
        )
    }
}

export default Login ;