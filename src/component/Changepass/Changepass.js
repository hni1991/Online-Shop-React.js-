import React from 'react';
import './Changepass.css';
import{url}from '../../url'

class Changepass extends React.Component{
constructor(props){
    super(props)
    this.url = url;
}

     
 myFetch=(url, data)=> {
    return fetch(url, {
            method: 'POST', //GET,PUT,DELETE,etc
            mode: 'cors', //no=cors, same-origin
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                //if method is GET use 'application/X-www-form-urlencoded'
            },
            redirect: 'follow', //manual , error
            referrer: 'no-referrer', //client
            body: JSON.stringify(data)
        })
        .then((response) => {
            JSON.stringify(response);
            return response.json();
        })
        .catch((err) => {
            return err;
        });
}
   getParameterByName(name, urlg) {
	if (!urlg){
        let url = window.location.href;
         let  locname =  name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + locname + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    } 
	

}

 changePass() {
	var tk = this.getParameterByName('tk');
	var email = this.getParameterByName('email');
	console.log('tk is:', tk, 'email is', email);
	let password1 = document.getElementById('password1').value;
	let password2 = document.getElementById('password2').value;

	let newPass = {
		email: email,
		tk: tk,
		newPass1: password1,
		newPass2: password2
	};
	this.myFetch(url + '/changePass', newPass)
		.then((data) => {
			if (data.message === 'Ok') {
				window.location.href = './login';
			} else {
				alert(data.data);
			}
		})
		.catch((error) => {
			console.log(error);
			alert('Technical problem');
		});
}

fildfuller = () =>{
    var email = this.getParameterByName('email');
   let emialI= document.getElementById('userMail')
   if(email){
    emialI.value = email

   }else{
       alert('not excist')
   }
}
componentDidMount(){
     this.fildfuller()
}

    render(){
        return(
            <div>
                <br/>
                  <div className="container">
            <div className="login-wrap goldenline">

            <form>
                    <div className="row d-flex justify-content-center">
                        <h5>Change Password</h5>
    
                    </div>
                    <div id="alertL"className="alert inv" role="alert">
                      </div>
                    <br/>
                    <div className="form-group row">
                        <label  className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" disabled id="userMail"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label  className="col-sm-4 col-form-label">New Password </label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control"  id="password1" required placeholder="New Password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                            <label  className="col-sm-4 col-form-label">Repassword </label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" required id="password2" placeholder="Retype your password"/>
                            </div>
                        </div>
                    <br/>
                    <div className="d-flex justify-content-center btnCss">
                        <button type="button" onClick={()=>this.changePass()} className="btn btn-outline-dark">Update</button>
                    </div>
                    <br/>
                </form>
    </div>
</div>
            </div>
        )
    }
}

export default Changepass;