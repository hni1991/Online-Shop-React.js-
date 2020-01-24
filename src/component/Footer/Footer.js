import React from 'react';
import './Footer.css';

class Footer extends React.Component{



    render(){
        return(
            <div>
                <br/>
                <hr className="goldline" ></hr>
                <br/>
       <footer className="mainFont page-footer font-small indigo">

<div className="container text-center text-md-left">

    <div className="row">

        <div className="col-md-3 mx-auto">

            <h5 className="fonti text-uppercase mt-3 mb-4"> Aladdin online shop </h5>
            <hr/>
            <ul className="list-unstyled">
               <p> This website is for test and only use for education purpose </p>
            </ul>

        </div>

        <hr className="clearfix w-100 d-md-none"/>

        <div className="col-md-3 mx-auto">

            <h5 className="fonti text-uppercase mt-3 mb-4">Page links</h5>
            <hr/>

            <ul className="list-unstyled" >
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                            <a href="./login.html">Login</a>
                    </li>
                    <li>
                        <a href="./register.html">Register</a>
                    </li>
                    <li>
                            <a href="./user.html">User</a>
                    </li>
                </ul>
        </div>

        <hr className="clearfix w-100 d-md-none"/>

        <div className="col-md-3 mx-auto">

            <h5 className="fonti text-uppercase mt-3 mb-4">LOCATION</h5>
            <hr/>

            <ul className="list-unstyled form-group row">
                        <li className="row col-12" ><i className="fas fa-map-marker-alt col-2"></i><p className="col-9">Hamburg</p></li>
              <li className="row col-12"><i className="fas fa-envelope col-2"></i><p  className="col-9">diamond@shop.com</p></li>
              <li className="row col-12"><i className="fas fa-globe-europe col-2"></i><p  className="col-9">www.diamond.mojtabazargar.com</p></li>
              <li className="row col-12"><i className="fas fa-phone col-2"></i><p  className="col-9">+4940123456</p></li>
            </ul>

        </div>

        <hr className="clearfix w-100 d-md-none"/>


    </div>

</div>
 
<hr/>
<div className="footer-copyright text-center py-3 mainFont1">© 2019 Copyright: MoAmHo :)))  
</div>

</footer>
            </div>
        )
    }
}

export default Footer;