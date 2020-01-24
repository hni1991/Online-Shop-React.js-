import React from 'react';
import './Singlepage.css';
import{dbUrl}from '../../url'
import Ordersuccess from '../Ordersuccess/Ordersuccess'


class Singlepage extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            orderS:false

        }
        this.myurl1 = dbUrl
        this.priceFixer =this.props.priceFixer;
this.priceS = this.props.priceS;
        this.price = '$';
        this.valNum = 1;
        this.defult = './image/4.jpg';
    }

     sendData(url, data) {
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
    
     itemCatcher = () => {
        this.priceCheker()

    console.log(window.location.search)
    let link = window.location.search
    let id = link.replace('?id=','')
    console.log(id)
    if(id ||id <! 0 ){
        this.sendData(this.myurl1+'/singleProduct',{id:id})
        .then(data =>{
            let mainHolder = document.getElementById('mainHolder');
            let nameHolder = document.getElementById('nameHolder');
            let categouryHolder = document.getElementById('categouryHolder')
            let priceHolder = document.getElementById('priceHolder')
            let descriptionHolder = document.getElementById('descriptionHolder')
            let imageHolder = document.getElementById('imageHolder')
            let qInput = document.getElementById('qInput')
            let btn = document.getElementById('btn')
            qInput.value = this.valNum
            console.log(data)
            if(data.message === 'Ok'){
                
                nameHolder.innerHTML = data.data[0].name;
                categouryHolder.innerHTML = data.data[0].category
                priceHolder.innerHTML =(data.data[0].price*this.priceFixer).toFixed(2)+' '+ this.priceS
                descriptionHolder.innerHTML = data.data[0].description
                categouryHolder.innerHTML = data.data[0].category
                if(data.data[0].photo){
                    let imgArr = data.data[0].photo.split(',,,')
                    for(let i=0; i<imgArr.length ; i++){
                        let div = document.createElement('div');
                        let img = document.createElement('img')
                        if(i===0){
                            div.className = "carousel-item back active"
                        }else{
                            div.className = "carousel-item back "
                        }
                        img.className = 'img-fluid imgSize '
                        img.src = imgArr[i]
                        div.appendChild(img)
                        imageHolder.appendChild(div)
                    }
                }else{
                    let div = document.createElement('div');
                        let img = document.createElement('img')
                        div.className = "carousel-item active"
                        img.className = 'img-fluid imgSize'
                        img.src = this.defult
                        div.appendChild(img)
                        imageHolder.appendChild(div)
                }
                btn.addEventListener('click',()=>{
                    this.orderit1(data.data[0].id , qInput.value);
                    this.setState({
                        orderS:true
                    }) 
                })
                mainHolder.style.visibility = 'visible'
            }else{
                let errorHolder = document.getElementById('errorHolder')
                let errorHolderH = document.getElementById('errorHolderH')
                errorHolder.style.visibility = 'visible'
                errorHolderH.innerHTML = 'Item Not Found Please go back and Click on item Again!'
            
            }
        
        })
        .catch(error =>{
            console.log(error)
            let errorHolder = document.getElementById('errorHolder')
            let errorHolderH = document.getElementById('errorHolderH')
            errorHolder.style.visibility = 'visible'
            errorHolderH.innerHTML = 'Item Not Found Please go back and Click on item Again!'
        })
    }else{
        let errorHolder = document.getElementById('errorHolder')
        let errorHolderH = document.getElementById('errorHolderH')
        errorHolder.style.visibility = 'visible'
        errorHolderH.innerHTML = 'Item Not Found Please go back and Click on item Again!'
    
    }
    
    
    }
    
     orderit1 = (id,q) => {
        let Quantity = q
        if(Quantity<1){
            Quantity=1
        }else{
            
        }
        console.log('productId in mainjs is:'+id+' '+Quantity);
        this.sendData(this.myurl1 + '/order', {
            productId: id,
            quantity:Quantity
        }).then((res) => {
            if (res.message === 'Ok') {
                this.props.orderupdate()    
            } else {
                window.location.href = '/login.html'
            }
        });
    };
     plus=()=>{
        let qInput = document.getElementById('qInput')
        this.valNum+=1
        console.log(this.valNum)
        qInput.value = this.valNum
    
    }
     minus=()=>{
        let qInput = document.getElementById('qInput')

    this.valNum-=1
    console.log(this.valNum)
    qInput.value = this.valNum
    
    }
    
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
    ordersuc=()=>{
        if(this.state.orderS){
            setTimeout(()=>{
                this.setState({
                    orderS:false
                })
            },1100)
            return(
                <div>
                    <Ordersuccess/>
                </div>
            )
        }else{
    
        }
    }

componentDidMount(){
    this.itemCatcher()

}

    //itemCatcher()


    render(){
        return(
            <div>
                  <div className="container prog mt-5" id="errorHolder">
      <h3 id="errorHolderH" className="text-center " style={{color: "gray"}}> </h3>
    </div>
    <div className="container prog" id="mainHolder" >
    {this.ordersuc()}

        <br/>
        <div className="row col-lg-12 col-md-12 col-sm-12">
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div >
                    <h3 id="nameHolder"> </h3>
                    <span id="categouryHolder"> </span>
                </div>
                <br/>
                <div>
                        <div id="carouselExampleControls" className="carousel slide" data-interval="0" data-ride="carousel">
                                <div className="carousel-inner back" id="imageHolder">
                                
                                 
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                  <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span className="sr-only">Next</span>
                                </a>
                              </div>
                </div>

            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
                <div className="d-flex justify-content-center"><h2>Price : </h2> <h2 id="priceHolder"> </h2> </div>
                <br/>
                <div>
                    <h5>Description :</h5>
                    <span id="descriptionHolder"></span>
                </div>
                <br/>
                <div> 
                        <div className="form-group">
                                
                                <div className="input-group  mb-3">
                                    <label  className="col-4">Quantity :</label>
                                    <button className="btn btn-light" onClick={()=>this.minus()}>-</button>
                                  <input id="qInput" type="number" className="form-control col-2 col-md-2 text-center" aria-label="Username"  aria-describedby="basic-addon1"/>
                                  <button className="btn btn-light" onClick={()=>this.plus()}>+</button>

                                </div>
                              </div>
                    </div>
                    <br/>
                <div><button type="button" id="btn" className="btn btn-danger btn-lg btn-block"><i className="fas fa-shopping-cart"></i>  Add to cart</button></div>
            </div>
          
        </div>
    </div>
            </div>
        )
    }
}

export default Singlepage;