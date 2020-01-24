import React from 'react';
import Menu from '../component/Menu/Menu'
import Footer from '../component/Footer/Footer'
//import Product from '../component/Product/Product'
//import Login from './component/Login/Login'
//import Register from '../component/Register/Register'
//import Basket from './component/Basket/Basket'
//import Singlepage from './component/Singlepage/Singlepage'
//import User from './component/User/User'
import Admin from '../component/Admin/Admin'
//import Changepass from './component/Changepass/Changepass'
class App extends React.Component {
  constructor(props,ref){
    super(props,ref)
    this.state={
  
    }
    this.child = React.createRef();
    this.priceFixer =''
    this.priceS = ''
    //this.price = '$';
  
  }
    priceCheker = ()=>{
      console.log('pricechecker')
  
          let ls = window.localStorage.getItem('price');
          if (ls === '{"price":"pound"}') {
              this.priceFixer = 0.81
              this.priceS = '£'
              console.log(this.priceS)
          
          } else if (ls === '{"price":"euro"}') {
              this.priceFixer = 0.91
              this.priceS = '€'
              console.log(this.priceS)
  
          
          } else if (ls === '{"price":"doller"}') {
              this.priceFixer = 1
              this.priceS = '$'
              console.log(this.priceS)
  
          
          }
      }
      somecheange =()=>{
        console.log('some chenge')
        //this.priceCheker()
        this.child.current.productFetching1()
      }


  render(){
 return (
   <div>
<Menu somecheange={()=>this.somecheange()}/>
<Admin ref={this.child}>{()=>this.child.current.productFetching1()}</Admin>
<Footer/>
   </div>

  )
  }
 
}

export default App;