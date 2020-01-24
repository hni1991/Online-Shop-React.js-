import React from 'react';
import './Basket.css';
import{url}from '../../url'


class Bsket extends React.Component{

    constructor(props){
        super(props)
        this.state ={

        }
        this.url = url
        this.priceFixer =this.props.priceFixer;
        this.priceS = this.props.priceS;
        this.price = '$';
        this.defult =  './image/4.jpg'
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
                if(res.data.length >0){
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
                        td2.innerText = (item.price*this.priceFixer).toFixed(2) + ' '+this.priceS;
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
          
                }else{
                    let holder = document.getElementById('container')
                    let holder2 = document.getElementById('hold2')
                    holder2.innerHTML=''
                    holder.innerHTML = ''
                    let h1 = document.createElement('h1')
                    h1.className = 'no-item'
                    h1.innerHTML=' Yor order list is empty'
                    holder.appendChild(h1)
                 //<button onClick={()=>window.location.href='/'} type="button" className="btn btn-danger">Continue shopping</button>


                    let btn = document.createElement('button')
                    btn.className ='btn btn-danger'
                    btn.innerHTML = 'Continue shopping'
                    btn.addEventListener('click',()=>{
                        window.location.href='/'
                    })
                    holder2.appendChild(btn)
                }
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
    componentDidMount(){
        this.basktCreator()
    }



    render(){
        return(
            <div>
                  <div className="container" >
 <div id='container'></div>
    <div className="row col-12 d-flex justify-content-around" id="hold2">
        <button onClick={()=>window.location.href='/'} type="button" className="btn btn-danger">Continue shopping</button>
   
        <button onClick={()=>window.location.href='/DB/buysingle'}type="button" className="btn btn-success">Pay now!</button>
    </div>
</div>
            </div>
        )
    }
}

export default Bsket;