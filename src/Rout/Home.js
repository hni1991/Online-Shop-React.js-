import React from 'react';
import Menu from '../component/Menu/Menu'
import Footer from '../component/Footer/Footer'
import Product from '../component/Product/Product'
import Slider from '../component/Slider/Slider'
import Zoom from '../component/Zoom/Zoom'

//import Register from './component/Register/Register'
//import Basket from './component/Basket/Basket'
//import Singlepage from './component/Singlepage/Singlepage'
//import User from './component/User/User'
//import Admin from './component/Admin/Admin'
//import Changepass from './component/Changepass/Changepass'
class App extends React.Component {
constructor(props,ref){
  super(props,ref)
  this.state={
    priceFixer :1,
    priceS :'$'
  }
  this.child = React.createRef();
  this.child1 = React.createRef();
  this.child2 = React.createRef();

}



    somecheange =()=>{
      console.log('some chenge')
      //this.priceCheker()
      this.child.current.productFetching()
    }
   menubar = ()=>{
    this.child1.current.menubarBfetch()
   }
   zoomi=(e)=>{
    this.child2.current.zoomer(e)
   }


  render(){
   //this.priceCheker()

 return (
   <div>
     <Zoom ref={this.child2} ></Zoom>
<Menu ref={this.child1} somecheange={()=>this.somecheange()}></Menu>
<Slider></Slider>
<Product ref={this.child} zoomi ={(e)=>{this.zoomi(e)}} orderupdate ={()=>this.menubar()}> {()=>this.child.current.productFetching()}</Product>
<Footer></Footer>
   </div>

  )
  }
 
}

export default App;