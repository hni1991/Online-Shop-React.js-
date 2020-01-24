import React from 'react';
import './User.css';
import{url}from '../../url'

class User extends React.Component{

    constructor(props){
        super(props)
        this.state ={
        editcheck:true

        }
        this.url = url
        this.priceFixer =this.props.priceFixer;
this.priceS = this.props.priceS;
        this.price = '$';
        this.lastnumber = 0;
        this.oldprepage = 0;
        this.mainEmail = {};
    }

 


 myFetch = (url, data)=> {
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




//user info from db to form
 infoUser =()=> {
    this.myFetch(this.url + '/DB/user', {})
        .then(data => {
            if (data.message === 'Ok') {
            console.log(data)
                let userName = document.getElementById('userFullname');
                userName.innerText = data.data[0].name + ' ' + data.data[0].lastName;
                let userMail = document.getElementById('userEmail');
                userMail.value = data.data[0].email;
                 this.mainEmail = data.data[0].email;

                let userPhone = document.getElementById('userPhone');
                userPhone.value = data.data[0].telephone;
              
                let userAddress = document.getElementById('userAddress');
                userAddress.value = data.data[0].street;
                let userPlz = document.getElementById('userPlz');
                userPlz.value = data.data[0].postCode;
            } else {
                alert('try again dear user :)))))')
            }
        })
}



//post edited user info from edit form to db

 updateInfo = () => {
  let editPhone = document.getElementById('editPhone').value;
  let editAddress = document.getElementById('editAddress').value;
  //let editCity = document.getElementById('editCity').value;
  let editPlz = document.getElementById('editPlz').value;  
    
    let editObj = {
        phoneNumber : editPhone,
        street : editAddress,
        postCode : editPlz
    }
    this.myFetch(this.url+'/updateUser',editObj)
    .then(data=>{
      console.log(data)
        if(data.message === 'ok'){
            this.showEditC();
            let editAlarm = document.getElementById('editAlarm');
            editAlarm.innerText=('User Updated Successfully')
            editAlarm.classList.remove('d-none');
            editAlarm.classList.add('d-block');
        }else{
            let editAlarm = document.getElementById('editAlarm');
            editAlarm.innerText=('try again later !!')
            editAlarm.classList.remove('d-none');
            editAlarm.classList.add('d-block');
        }
    })
    .catch(error => {
      console.log(error)
        let editAlarm = document.getElementById('editAlarm');
        editAlarm.innerText=('Technical problem')
        editAlarm.classList.remove('d-none');
        editAlarm.classList.add('d-block');
    })
}

usereditinfo = () =>{
  this.myFetch(this.url + '/DB/user', {})
  .then(data => {
    console.log(data)
      if (data.message === 'Ok') {
      let editFullname = document.getElementById('editFullname');
      editFullname.value = data.data[0].name + ' ' + data.data[0].lastName;
      let editEmail = document.getElementById('editEmail');
      editEmail.value = data.data[0].email;
      let editPhone = document.getElementById('editPhone');
      editPhone.value = data.data[0].telephone;
    
      let editAddress = document.getElementById('editAddress');
      editAddress.value = data.data[0].street;
      let editPlz = document.getElementById('editPlz');
      editPlz.value = data.data[0].postCode;
      }
  })
}


//  hideEdit = ()=> {
    
//     var infoPic = document.getElementById('infoPic');
// var editForm = document.getElementById('editForm');
// var editPic = document.getElementById('editPic');
// let infoForm = document.getElementById('infoForm');

//     editForm.classList.add('d-none');
//     editPic.classList.add('d-none');

//     infoForm.classList.remove('d-none');
//     infoPic.classList.remove('d-none');
// }
// showEdit=()=>{
//   this.editcheck = !this.editcheck  
// this.showEditC()
// }

 showEditC=()=> {
if(this.state.editcheck === true){
  return(
    <form id="infoForm" className="formfix col-9">
       <br/>
    <br/>
    <div className="row d-flex justify-content-center col-lg-12 col-md-12 col-sm-12">
   

      <h3 id="userFullname"> </h3>
      <br/>
    </div>
    <div className="form-group row">
      <label  className="col-sm-12 col-form-label">Email</label>
      <div className="col-sm-12">
        <input type="text" readOnly className="form-control-plaintext" disabled id="userEmail"/>
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-12 col-form-label">Phone</label>

      <div className="col-sm-12">
        <input type="text" readOnly className="form-control-plaintext" disabled id="userPhone"/>
      </div>
    </div>
   
    <div className="form-group row">
      <label className="col-sm-12 col-form-label">Address</label>

      <div className="col-sm-12">
        <input type="text" readOnly className="form-control-plaintext" disabled id="userAddress"/>
      </div>
    </div>
    <div className="form-group row">
      <label  className="col-sm-12 col-form-label">City</label>

      <div className="col-sm-12">
        <input type="text" readOnly className="form-control-plaintext " id="userPlz"/>
      </div>
    </div>
    <br/>
    <br/>

    <div className="row d-flex justify-content-center col-lg-12 col-md-12 col-sm-12">
      <span   onClick={()=>{this.setState({editcheck:false})}}>Edit Information<i className="fas fa-cog settingLogo"
     ></i></span>
    </div>
  {  this.infoUser()}
  </form>
  
  )


}else{

  return(
<form id="editForm" className="formfix back">
                  <br/>
                  <br/>
                  <div className="alert alert-warning d-none" role="alert" id="editAlarm"></div>
                <div className="form-group">
                  <label >First name / Last name</label>
                  <input type="text" className="form-control" disabled id="editFullname"/>
                </div>
                <div className="form-group">
                  <label >Email</label>
                  <input type="email" className="form-control" disabled id="editEmail"/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label >Phone</label>
                    <input type="text" className="form-control" id="editPhone"/>
                  </div>
                  <div className="form-group col-md-6">
                    <label >Address</label>
                    <input type="text" className="form-control" id="editAddress"/>
                  </div>
                </div>
                <div className="form-row">
                 
                  <div className="form-group col-md-12">
                    <label >City</label>
                    <input type="text" className="form-control" id="editPlz"/>
                  </div>
                </div>
                  {/* <!-- az inja --> */}
                  <div className="form-group">
                      <button type="button" className="btn btn-outline-info" onClick={()=>this.changePass()}>Change password</button>
                    </div>
                    {/* <!-- ta inja --> */}
                <button type="button" className="btn btn-outline-success" onClick={()=>this.updateInfo()} >Update</button>
                <button type="button" className="btn btn-outline-danger" onClick={()=>{this.setState({editcheck:true})}}>Cancel</button>
{ this.usereditinfo()
}
              </form>
  )

}

}





//start history Table Creatore


 historyCreator = (data) => {
  this.priceCheker()

    let tbody = document.getElementById('tableBody');

    data.data.forEach((item) => {

        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        let th = document.createElement('th');
        th.classList.add('d-flex');
        th.classList.add('align-items-center');
        th.classList.add('bgCss');
        tr.appendChild(th);

        if (item.photo) {
            let imageArray = item.photo.split(',,,');
            let image = imageArray[0];
            let img = document.createElement('img');
            img.src = image.replace('public', '');
            img.classList.add('basketImg');
            th.appendChild(img);
        } else {
            let img = document.createElement('img');
            img.src = this.defult;
            img.classList.add('basketImg');
            th.appendChild(img);

        }
        let p1 = document.createElement('p');
        p1.innerText = item.name;
        p1.classList.add('titleCss');
        th.appendChild(p1);
        let th1 = document.createElement('th');
        th1.classList.add('tPrice');
        p1 = document.createElement('p');
        p1.innerText = '10.10.2019';
        th1.appendChild(p1);
        tr.appendChild(th1);
        let th2 = document.createElement('th');
        th2.classList.add('tPrice');
        let p2 = document.createElement('p');
        p2.innerText = (item.price * this.priceFixer).toFixed(2) + ' ' + this.priceS;
        th2.appendChild(p2);
        tr.appendChild(th2);
    })
}
 historyfetchin = () =>{
    this.myFetch(this.url + '/DB/history', {})
    .then(data => {
        if (data.message === 'Ok') {
            console.log(data)
            this.historyCreator(data)
        } else {
            let displayClass = document.getElementById('displayClass');
            displayClass.classList.add('invisible');
            displayClass.classList.remove('visible');
            let hisAlarm = document.getElementById('hisAlarm');
            hisAlarm.classList.remove('invisible');
            hisAlarm.classList.add('visible');
            hisAlarm.innerText = 'You dont have history';
        }
    }).catch(err => {
        console.log(err)
        let hisAlarm = document.getElementsByClassName('hisAlarm');
        hisAlarm.classList.remove('invisible');
        hisAlarm.classList.add('visible');
        hisAlarm.innerText = 'Technical problem,please refresh again';
    })

}



//finish history
priceCheker = ()=>{
  let ls = window.localStorage.getItem('price');
  if (ls === '{"price":"pound"}') {
      this.priceFixer = 0.81
      this.priceS = '£'
  
  } else if (ls === '{"price":"euro"}') {
      this.priceFixer = 0.91
      this.priceS = '€'
  
  } else if (ls === '{"price":"doller"}') {
      this.priceFixer = 1
      this.priceS = '$'
  
  }
}




//B A S K E T

 basktCreator=()=>{
  this.priceCheker()
	let table = document.createElement('table');

	let container = document.getElementById('container');
	container.innerHTML = '';
	container.appendChild(table);
	table.classList.add('table2');
	table.classList.add('table');
	
	table.classList.add('table-bordered');
	let thead = document.createElement('thead');
	table.appendChild(thead);
	let tr = document.createElement('tr');
	thead.appendChild(tr);
	let th1 = document.createElement('th');
	tr.appendChild(th1);
	th1.innerText = 'Items';
	let th2 = document.createElement('th');
	tr.appendChild(th2);
	th2.classList.add('tHead');
	th2.innerText = 'Total';
	let th3 = document.createElement('th');
	tr.appendChild(th3);
	th3.classList.add('tHead');
	th3.innerText = 'Quantity';
	let tbody = document.createElement('tbody');
	table.appendChild(tbody);
	let totalPrice = 0;
	this.myFetch(this.url + '/DB/userOrders', {})
		.then((res) => {
			console.log('it is ok ', res);
			let data = res.data;
			data.forEach((item) => {
				let tr = document.createElement('tr');
	
				table.appendChild(tr);
				let td = document.createElement('td');
				tr.appendChild(td);
				//console.log('item.photo:', item.photo);
	
				if (item.photo) {
					let imageArray = item.photo.split(',,,');
					// imageArray.forEach((image) => {
					let image = imageArray[0];
					let img = document.createElement('img');
					img.src = image.replace('public', '');
					img.classList.add('basketImg');
					td.appendChild(img);
				}
				let p = document.createElement('p');
				p.innerText = item.name;
				td.appendChild(p);
				let td2 = document.createElement('td');
	
				tr.appendChild(td2);
				if(item.quantity>1){
					let pricePlus = item.price*item.quantity
					td2.innerText = (pricePlus*this.priceFixer).toFixed(2) + ' '+this.priceS;
					totalPrice += pricePlus;
				}else{
					td2.innerText = (item.price*this.priceFixer ).toFixed(2)+ ' '+this.priceS;
					totalPrice += item.price;
				}
			
				let td4 = document.createElement('td');

				tr.appendChild(td4);
				td4.innerText = item.quantity;

				let td3 = document.createElement('td');
				tr.appendChild(td3);
				let btn = document.createElement('button');
				btn.classList.add('btn');
				btn.classList.add('btn-danger');
	
				btn.addEventListener('click', () => {
					this.deleteItem(item.order_id);
				});
				btn.id = item.id;
				btn.innerText = 'remove';
				td3.appendChild(btn);
			});
			let trTotal = document.createElement('tr');
			table.appendChild(trTotal);
			let td = document.createElement('td');
			let tdTotal = document.createElement('td');
			trTotal.appendChild(td);
			trTotal.appendChild(tdTotal);
			td.innerText = 'Total Payment is:';
			tdTotal.innerText = (totalPrice*this.priceFixer).toFixed(2) +' '+this.priceS;
		})
		.catch((err) => {
			console.log('there is an error:', err.message);
		});
}
deleteItem = (id)=>{
  this.myFetch(this.url + '/DB/deleteOrder', { id: id })
      .then((reply) => {
          console.log(reply);
          this.basktCreator()
          this.props.orderupdate()
      })
      .catch((err) => console.error(err.message));
}

// az inja
 changePass() {
    this.myFetch(this.url + '/passwordChangeRequest', {email : this.mainEmail})
    .then(data => { 
        console.log(data)
        if (data.message === 'Ok') {
            let editAlarm = document.getElementById('editAlarm');
            editAlarm.innerText = 'Please check your Email';
            editAlarm.classList.remove('d-none');
            editAlarm.classList.add('d-block');
        } else {
            let editAlarm = document.getElementById('editAlarm');
            editAlarm.innerText = 'Try againg for change password'
            editAlarm.classList.remove('d-none');
            editAlarm.classList.add('d-block');
        }
    })
    .catch(error =>{
        console.log(error)
    })
  }
  userCreator(){
    this.historyfetchin();
    this.basktCreator();

  }




  componentDidMount(){
this.historyfetchin();
this.basktCreator();
  }

//ta inja


    render(){
        return(
            <div className="back">
              <br/>
              <br/>

                 <div className="container userInfo back">
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
          aria-controls="nav-home" aria-selected="true">Profile</a>
        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
          aria-controls="nav-profile" aria-selected="false">History</a>
        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Your Order(s)</a>
      </div>
    </nav>
    <div className="tab-content back" id="nav-tabContent">
      {/* <!-- start user info --> */}
      <div className="tab-pane fade show active back" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

        <div className="row col-lg-12 col-md-12 col-sm-12 infoCss back">
       {this.showEditC()}
        </div>
      </div>
      {/* <!-- finish user info --> */}


      {/* <!-- start history --> */}
      <div className="tab-pane fade back" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div className="alert alert-danger invisible" role="alert" id="hisAlarm"></div>          

        <div className="table-responsive back" id="displayclassName">
        <table className="table table-bordered back goldenline">
          <thead className="goldenline">
            <tr>
              <th>Item(s)</th>
              <th className="tHead">Date</th>
              <th className="tHead">Price</th>
            </tr>
          </thead>
          <tbody id="tableBody" className="back">


          </tbody>
        </table>
        </div>
      </div>
      {/* <!-- finish history --> */}

      {/* <!-- start basket in user --> */}
   <div className="tab-pane fade back" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
   <br/>

      <div id='container'></div>
      <br/>
      <div className="row col-12 d-flex justify-content-around">
      
          <button onClick={()=>window.location.href='/'} type="button" className="btn btn-danger">Continue shopping</button>
     
          <button onClick={()=>window.location.href='/DB/buysingle'} type="button" className="btn btn-success">Pay now!</button>
      </div>
      <br/>



   </div>
      {/* <!-- finish basket in user --> */}
   
    </div>
  </div>
            </div>
        )
    }

}

export default User;