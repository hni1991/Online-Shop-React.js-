import React from 'react';
import './Menu.css';
import{url,dbUrl}from '../../url'


class Menu extends React.Component{

    constructor(props){
        super(props)
        this.state ={

        }
        this.myurl2 = dbUrl
        this.priceFixer =''
        this.priceS = ''
        this.price = '$';
        this.lastnumber = 0;
        this.oldprepage = 0;
    }
    //hier
    


// fetch function for all modul's
 sendData = (url, data) => {
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
          return   response.json();
        });
}

 search(e) {
//     let form = document.getElementsByClassName('form-inline')[0];
// form.addEventListener('submit', search);
	e.preventDefault();
	let search = document.getElementById('serchInput').value;
	window.location.href = '/?search=' + search;
	//window.location.href = 'http://localhost:3001/';
}

//basket fetch
 menubarBfetch = () => {
    this.sendData(this.myurl2 + '/userOrders', {})
        .then(data => {
            let basketBox = document.getElementById('basketBox')
            basketBox.innerHTML = ''
            let p = document.createElement('p');
            let ii = document.createElement("i");
            let aa = document.createElement('a');
            ii.className = 'fas fa-shopping-cart'
            aa.href = "./basket.html"
            aa.appendChild(ii)
            basketBox.appendChild(aa)
            if (data.message === 'ok') {
                let x = 0;
                for (let i = 0; i < data.data.length; i++) {
                    x = x + data.data[i].price * this.priceFixer
                }
                console.log(x)
                p.innerHTML = data.data.length + ' item - total price ' + this.priceS + ' ' + (x).toFixed(2) 
                basketBox.appendChild(p)

            }else{
                p.innerHTML =  ' 0 item - total price  0' + this.priceS ;
                basketBox.appendChild(p) 
            }
        })
        .catch(error=>{
            console.log(error)
            let basketBox = document.getElementById('basketBox')
            basketBox.innerHTML = ''
            let p = document.createElement('p');
            let ii = document.createElement("i");
            let aa = document.createElement('a');
            ii.className = 'fas fa-shopping-cart'
            aa.href = "./basket.html"
            aa.appendChild(ii)
            basketBox.appendChild(aa)
            p.innerHTML =  ' 0 item - total price  0' + this.priceS ;
            basketBox.appendChild(p) 
        })

}

 pricedCreator = () => {
    let priceBox = document.getElementById('priceBox')
    priceBox.innerHTML = ''

    //1 doller
    let lii1 = document.createElement('li');
    lii1.className = 'nav-item'
    lii1.addEventListener('click', (e) => {
        window.localStorage.setItem('price', JSON.stringify({
            price: 'doller'
        }));
        let parent = e.target.parentElement;
        let mainP = parent.parentElement;
        for (let i = 0; i < mainP.childNodes.length; i++) {
            if (mainP.childNodes[i].classList.contains("activeit")) {
                mainP.childNodes[i].classList.remove("activeit")
            } else {
                
            }
        }
        console.log(e.target.innerHTML)
        e.target.parentElement.className += ' activeit'
        this.priceFixer = 1
        this.priceS = '$'
       // navCreator()
        this.priceCheker()
        this.props.somecheange();


    })
    let spnn1 = document.createElement('span');
    spnn1.className = 'nav-link'
    spnn1.innerHTML = '$';
    lii1.appendChild(spnn1)
    priceBox.appendChild(lii1);
    //2 euro
    let lii2 = document.createElement('li');
    lii2.className = 'nav-item'
    lii2.addEventListener('click', (e) => {
        window.localStorage.setItem('price', JSON.stringify({
            price: 'euro'
        }));

        let parent = e.target.parentElement;
        let mainP = parent.parentElement;
        for (let i = 0; i < mainP.childNodes.length; i++) {
            if (mainP.childNodes[i].classList.contains("activeit")) {
                mainP.childNodes[i].classList.remove("activeit")
            } else {
                
            }
        }
        console.log(e.target.innerHTML)
        e.target.parentElement.className += ' activeit'
        this.priceFixer = 0.91
        this.priceS = '€'
       
        this.priceCheker()
        this.props.somecheange();


    })
    let spnn2 = document.createElement('span');
    spnn2.className = 'nav-link'
    spnn2.innerHTML = '€';
    lii2.appendChild(spnn2)
    priceBox.appendChild(lii2);
    //3 pound
    let lii3 = document.createElement('li');
    lii3.className = 'nav-item'
    lii3.addEventListener('click', (e) => {
        window.localStorage.setItem('price', JSON.stringify({
            price: 'pound'
        }));

        let parent = e.target.parentElement;
        let mainP = parent.parentElement;
        for (let i = 0; i < mainP.childNodes.length; i++) {
            if (mainP.childNodes[i].classList.contains("activeit")) {
                mainP.childNodes[i].classList.remove("activeit")
            } else {
                
            }
        }
        console.log(e.target.innerHTML)
        e.target.parentElement.className += ' activeit'
        this.priceFixer = 0.81
        this.priceS = '£'
       
        this.priceCheker()
        this.props.somecheange();
        

    })
    let spnn3 = document.createElement('span');
    spnn3.className = 'nav-link'
    spnn3.innerHTML = '£';
    lii3.appendChild(spnn3)
    priceBox.appendChild(lii3);
    let ls = window.localStorage.getItem('price');

    if (!ls) {
        console.log('false is ' + ls)
        lii1.className = 'page-item activeit'
        window.localStorage.setItem('price', JSON.stringify({
            price: 'doller'
        }));
        this.priceFixer = 1
        this.priceS = '$'

    } else {
        if (ls === '{"price":"pound"}') {
            lii3.className = 'page-item activeit'
            this.priceFixer = 0.81
            this.priceS = '£'

        } else if (ls === '{"price":"euro"}') {
            lii2.className = 'page-item activeit'
            this.priceFixer = 0.91
            this.priceS = '€'


        } else if (ls === '{"price":"doller"}') {
            lii1.className = 'page-item activeit'
            this.priceFixer = 1
            this.priceS = '$'


        }
        console.log(ls)
    }
}
 navCreator = (p) => {

    let logS = document.getElementById('logS');
    logS.innerHTML = ''
    let lii1 = document.createElement('li');
    let lii2 = document.createElement('li');
    let lii3 = document.createElement('li');
    let lii4 = document.createElement('li');


    let aa1 = document.createElement('a');
    let aa2 = document.createElement('a');
    let aa3 = document.createElement('a');
    let aa4 = document.createElement('a');

    this.sendData(url+'/status', {})
        .then(data => {
            console.log(data)
            if (data.message === 'Ok') {
                this.menubarBfetch()
                let logout = lii1;
                logout.className = 'nav-item'
                aa1.className = 'nav-link'
                aa1.innerHTML = 'Logout'
                aa1.href = './logout'
                logout.appendChild(aa1)

                let order = lii2
                order.className = 'nav-item'
                aa2.className = 'nav-link'
                aa2.innerHTML = 'Order'
                aa2.href = './basket.html'
                order.appendChild(aa2)

                let user = lii3
                user.className = 'nav-item'
                aa3.className = 'nav-link'
                aa3.innerHTML = 'User'
                aa3.href = './user.html'
                user.appendChild(aa3)

                let home = lii4
                home.className = 'nav-item'
                aa4.className = 'nav-link'
                aa4.innerHTML = 'Home'
                aa4.href = './'
                home.appendChild(aa3)

                logS.appendChild(home)
                logS.appendChild(user)
                logS.appendChild(order)
                logS.appendChild(logout)
            } else {
                let home = lii3
                home.className = 'nav-item'
                aa3.className = 'nav-link'
                aa3.innerHTML = 'Home'
                aa3.href = './'
                home.appendChild(aa3)

                let login = lii1
                login.className = 'nav-item'
                aa1.className = 'nav-link'
                aa1.innerHTML = 'Login'
                aa1.href = './login.html'
                login.appendChild(aa1)

                let register = lii2
                register.className = 'nav-item'
                aa2.className = 'nav-link'
                aa2.innerHTML = 'Register'
                aa2.href = './register.html'
                register.appendChild(aa2)
                logS.appendChild(home)
                logS.appendChild(login)

                logS.appendChild(register)
            }
        })
        .catch(error => console.log(error))

}
 priceCheker = ()=>{
    let ls = window.localStorage.getItem('price');
    if (ls === '{"price":"pound"}') {
        this.priceFixer = 0.81
        this.priceS = '£'
        this.menubarBfetch()
       // productFetching()
      // this.recreator()

    } else if (ls === '{"price":"euro"}') {
        this.priceFixer = 0.91
        this.priceS = '€'
        this.menubarBfetch()

        //this.recreator()
    } else if (ls === '{"price":"doller"}') {
        this.priceFixer = 1
        this.priceS = '$'
        this.menubarBfetch()

       // this.recreator()
    }
}

//  recreator =()=>{
//     this.menubarBfetch()

//     if(typeof this.props.productFetching ==='function'){
//         this.props.productFetching()
//         this.lastnumber = 0;
//         this.oldprepage = 0;
//        }else if(typeof productFetching1 ==='function'){
//         this.props.productFetching1()
//         this.lastnumber = 0;
//         this.oldprepage = 0;
//        }else if(typeof itemCatcher ==='function'){
//         this.props.itemCatcher()
//        }else if(typeof basktCreator==='function'){
//         this.props.basktCreator()

//        }else if(typeof historyfetchin==='function'){
//         this.props.historyfetchin()
//        }else if(typeof itemCatcher==='function'){
//         this.props.itemCatcher()
//        }
       
//        else{
//            console.log('nothing to call')
//        }
// }
componentDidMount(){
    this.pricedCreator(this.price)
    this.menubarBfetch()
    this.navCreator()
}


//to hier
    render(){
        return(
            <div className="bkg">
            <nav className="navbar bkb navbar-light navbar-expand firstNav">
                <div className="navbar row col-md-12 col-sm-12">
                    <div className="navbar-nav order-1 order-md-0 col-sm-12 col-md-6">
                        <ul className="nav navbar-nav mr-auto changer" id="priceBox">

                            {/* <!-- <li className="nav-item">
                                <span className="nav-link active">$</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" >€</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" >£</span>
                            </li> --> */}
                        </ul>
                    </div>
                    <div className="navbar-nav order-3 col-sm-12 col-md-6">
                        <ul className="nav navbar-nav ml-auto" id="logS">
                        {/* <li className="nav-item ">
                            <a className="nav-link" href="./">Home <span className="sr-only">(current)</span></a>
                        </li> */}
                            {/* <!-- <li className="nav-item">
                                <a className="nav-link" href="./login.html">LOGIN</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">COMPARE</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">HISTORY</a>
                            </li> --> */}
                        </ul>
                    </div>
                </div>
            </nav>
        <div className=" ">
            <div className="row col-sm-12 col-md-12 col-lg-12">
                <div className="col-lg-6 col-sm-12 col-md-12 logo">
                    <a className="alink" href="./">
                    <i className="far fa-gem si"></i>
                        <h1 className="fft">Diamond</h1>
                        <h4 className="fft">online shop</h4></a>
                    
                </div>
                <div className="row col-lg-6 col-sm-12 col-md-12 searchBar fx">
                    <div className="row col-sm-12 col-md-6 col-lg-7">
                        <form className="form-inline " onSubmit={(e)=>this.search(e)}>
                            <input className="form-control mr-sm-2" type="search" id='serchInput' placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    <div id="basketBox" className="row rightHead col-sm-12 col-md-6 col-lg-5 fx1">
                        <a href="./basket.html"><i className="fas fa-shopping-cart"></i></a>
                    </div>
        
                </div>
            </div>
        </div>
        <nav className="navbar bkb navbar-expand-lg navbar-light secNav">

                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                {/* <div className=" navbar collapse navbar-collapse" id="navbarTogglerDemo02">
                    
                    <ul className="navbar-nav">
                        
                        {/* <!-- <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li> --> 
                    </ul>
                </div>*/}
            </nav> 

            <br/>
            <hr className="goldline"/>
            </div>
        )
    }
}

export default Menu;
