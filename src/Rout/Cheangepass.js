import React from 'react';
import Menu from '../component/Menu/Menu'
import Footer from '../component/Footer/Footer'
//import Product from '../component/Product/Product'
//import Login from './component/Login/Login'
//import Register from '../component/Register/Register'
//import Basket from './component/Basket/Basket'
//import Singlepage from '../component/Singlepage/Singlepage'
//import User from './component/User/User'
//import Admin from './component/Admin/Admin'
import Changepass from '../component/Changepass/Changepass'
class App extends React.Component {

  somecheange =()=>{
    console.log('some chenge')
  }

  render(){
 return (
   <div>
<Menu somecheange={()=>this.somecheange()}/>
<Changepass/>
<Footer/>
   </div>

  )
  }
 
}

export default App;