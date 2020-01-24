import React from 'react';
import './Product.css';
import{dbUrl}from '../../url'
import Ordersuccess from '../Ordersuccess/Ordersuccess'
class Product extends React.Component{
    constructor(props,ref){
        super(props,ref)
        this.state={
            priceFixer :'',
            priceS :'',
            orderS:false

        }
        
        
        
        this.myurl = dbUrl
    
// priceFixer :this.props.priceFixer,
// priceS : this.props.priceS
this.elementNumber = '';
this.lastnumber = 0;
this.oldprepage = 0;
 this.show = false
    this.filter = false
        
 

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

// this finction fetchin the product
 

 productFetching = (pageNumber) => {
     this.priceCheker()
     console.log(this.state.priceS)
    let num;
    if (pageNumber !== '') {
        num = pageNumber
    } else {
        num = 1
    }
    let categ = document.getElementById('categ').value
    let prepage = document.getElementById('prePage').value
    let sort = document.getElementById('sort').value
    let sort1 = ''
    let direction1 = ''
    if(sort){
       let result = sort.split(' ')
       sort1 = result[0];
       direction1 = result[1]
    }
    var searchWord = window.location.href.split('search=')[1] || '';
	console.log('search is', searchWord);
    let data = {
        numberInPage: prepage,
        page_number: num,
        category: categ,
        sort: sort1,
        direction:direction1,
        searchWord:searchWord ,
        //add serch
    };
    this.elementNumber = prepage;
    //  let consept = {direction:'',page_number:1,numberInPage:12,category:'All'}
    this.sendData(this.myurl+'/products', data)
        .then(data => {
            if(data.message ==='ok'){
                if(data.data.data.length >0){
                    console.log(data)
                    this.productCreator(data)
                }else{
                    this.productEhandled(' Item Not Found')
                    console.log(data)

                }
               
            }else{
                this.productEhandled(' Item Not Found')

            }
            
        })
        .catch(error => {
            this.productEhandled('Error 404 please refresh the page')
            console.log(error)})
}
 Category = () => {
    let select = document.getElementById('categ');
    this.sendData(this.myurl + '/categorySender', {}).then((result) => {
        console.log(result);
        if(result){
            result.forEach((item) => {
                console.log(item.category);
                let opt = document.createElement('option');
                opt.innerHTML = item.category;
                select.appendChild(opt);
            });
        }else{

        }
    
    });
}

productEhandled=(message)=>{
    let productBox = document.getElementById('productBox')
    let filterHold =  document.getElementById('filterHold')
    filterHold.innerHTML = ' '
    let div = document.createElement('div');
    let h = document.createElement('h1');
    h.innerHTML = message
    div.className = 'no-item'
    div.appendChild(h)
    productBox.appendChild(div)

}

 productCreator = (data) => {
    let productBox = document.getElementById('productBox')
    let defult = './image/4.jpg'
    console.log(data)
    let myData = data.data.data;
    console.log(myData)
    productBox.innerHTML = ''
    for (let i = 0; i < myData.length; i++) {

        let div = document.createElement('div');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let h5 = document.createElement('h5');
        let h51 = document.createElement('h5');
        let img = document.createElement('img');
        let btn1 = document.createElement('button');
        let btnbigi = document.createElement('button');
       
        let input1 = document.createElement('input');
        let i1 = document.createElement('i');
        let i2 = document.createElement('i');
        div.className = 'card col-12 col-md-3 p-2 back bf';
        img.className = 'card-img-top p-0 m-0'
        if (myData[i].photo) {
            this.imgArr = myData[i].photo.split(',,,')
            let image = this.imgArr[0]
            let im = image.replace('public', '.');

       //     image.replace('public', '');
            img.src = im
        } else {

            img.src = defult
        }
        btnbigi.id = myData[i].id
        i2.id = myData[i].id
        btnbigi.addEventListener("click",(e)=> {
            // this.imgArr = myData[i].photo.split(',,,')
            // let image = this.imgArr[0]
            // console.log(image)
            //     this.bigi()
            let id = e.target.id
            console.log(id)
            this.props.zoomi(id)
            
        })
        div1.className = 'card-body text-center p-0 bn';
        div1.id = myData[i].id
        img.id = myData[i].id
        h5.id = myData[i].id
        h51.id = myData[i].id
        i1.id = myData[i].id
        img.addEventListener('click', (e) => {
            this.spd(e.target.id) 

        })
        div1.addEventListener('click', (e) => {
            this.spd(e.target.id) 

        })
        h5.className = 'card-title zz tc';
        h5.innerHTML = myData[i].name
        h51.className = 'card-title zz tc';
        h51.innerHTML = this.state.priceS + " " + (myData[i].price * this.state.priceFixer).toFixed(2);
        div2.className = 'card-footer text-center bn1 bk'

        btn1.onclick = (e) => {
            console.log(e.target.id,'........is the e.target.id for the order ')
            this.orderit(e.target.id)
          //  document.getElementById('mainHolder').innerHTML+= <div><Ordersuccess/></div>;
               this.setState({
                   orderS:true
               }) 

            
        }

        i1.className = 'fas fa-shopping-cart ic'
        i1.id = myData[i].id;
        i2.className = 'fas fa-search-plus ic'
        input1.value = 1
        input1.className = 'col-3 col-md-4 inputF'
        input1.type = 'number'
        input1.placeholder = "1"
        div1.appendChild(img)
        div.appendChild(div1)
        div1.appendChild(h5)
        div1.appendChild(h51);
        div.appendChild(div2)
        div2.appendChild(btn1)
        btn1.appendChild(i1)

        // div2.appendChild(input1)
        div2.appendChild(btnbigi)
        btnbigi.appendChild(i2)
        productBox.appendChild(div)
    }

    if (this.lastnumber !== data.data.total_number || this.oldprepage !== this.elementNumber) {
        this.oldprepage = this.elementNumber
        this.lastnumber = data.data.total_number
        let numberOfPage = Math.ceil(data.data.total_number / myData.length)
        this.pagination(numberOfPage)

    } else {
    }
}
//single product destination
 spd = (id) =>{
    window.location.href = './singlepage.html?id=' + id

}
//pagination
 pagination = (num) => {
    console.log(num)
    let paginationBox = document.getElementById('paginastionBox')
    paginationBox.innerHTML = ''


    if (num > 1) {
        for (let i = 0; i < num; i++) {
            let lii = document.createElement('li');
            lii.className = 'page-item pi'
            lii.addEventListener('click', (e) => {
                let parent = e.target.parentElement;
                let mainP = parent.parentElement;
                for (let i = 0; i < mainP.childNodes.length; i++) {
                    if (mainP.childNodes[i].classList.contains("activep")) {
                        mainP.childNodes[i].classList.remove("activep")
                    } else {

                    }
                }
                console.log(e.target.innerHTML)
                e.target.parentElement.className += ' activep'
                this.productFetching(e.target.innerHTML)
            })

            let spnn = document.createElement('span');
            spnn.className = 'page-link pl'
            spnn.innerHTML = i + 1;
            paginationBox.appendChild(lii);
            lii.appendChild(spnn)

            if (i === 0) {
                lii.className = 'page-item activep'

            } else {
            }

        }

    } else {
        let lii = document.createElement('li');
        lii.className = 'page-item pi'
        let spnn = document.createElement('span');
        spnn.className = 'page-link pl'
        spnn.innerHTML = 1;
        paginationBox.appendChild(lii);
        lii.appendChild(spnn)

    }


}

// this function create first navighation




 orderit = (id) => {
    console.log('productId in mainjs is:', id);
    this.sendData(this.myurl + '/order', {
        productId: id
    }).then((res) => {
        if (res.message === 'Ok') {
        this.props.orderupdate()
        } else {
           window.location.href = '/login.html'
        }
    });
}

    
filterrr(){
    this.filter = !this.filter
    console.log(this.filter)
    if(this.filter){
    document.getElementById('filterBox').style.display='block'
    }else{
        document.getElementById('filterBox').style.display='none'
    }
   
}

// bigi = (param) =>{
//     this.show = !this.show
//     console.log(param)
//     let bigS = document.getElementById('bigS')
//     if(this.show){
//         if(Array.isArray(param) ){
//             let holder = document.getElementById('slideHolder');
//             holder.innerHTML ='';
//             for(let i=0 ;i<param.length ;i++){
//                 let div = document.createElement('div')
//                 if(i === 0){
//                     div.className = "carousel-item active"
//                 }else{
//                     div.className = "carousel-item "
//                 }
//                 let img = document.createElement('img')
//                 img.className = "d-block w-100"
//                 img.src = param[i]
//                 div.appendChild(img)
//                 holder.appendChild(div)
//             }
//            document.getElementById('bigSslide').style.display='block'
//             console.log('array')


//         }else{
//             bigS.innerHTML =''
//             let spann = document.createElement('span')
//             let ii = document.createElement('i')
//             let img = document.createElement('img')

//             spann.addEventListener('click',()=>{
//                 this.bigi() 
//             })
//             ii.className = "far fa-times-circle"
//             spann.appendChild(ii)
//             img.className = "img-fluid"
//             img.src = param
//             bigS.appendChild(spann)
//             bigS.appendChild(img)
//             document.getElementById('bigS').style.display='block'
//             console.log('single')

//         }
//     }else{
//     document.getElementById('bigS').style.display='none'
//     document.getElementById('bigSslide').style.display='none'

//     }
// }
 priceCheker = ()=>{
    let ls = window.localStorage.getItem('price');
    if (ls === '{"price":"pound"}') {
        this.setState({
            priceFixer : 0.81,
            priceS : '£'
        })
    
    } else if (ls === '{"price":"euro"}') {
       
        this.setState({
            priceFixer : 0.91,
            priceS :'€'
        })
    
    } else if (ls === '{"price":"doller"}') {
        this.setState({
            priceFixer : 1,
            priceS :'$'
        })
       
    
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
       console.log(this.state.priceFixer)
       this.productFetching()
       this.Category()
    }

    render(){
        return(
            <div className="back" id='mainHolder'>
                {this.ordersuc()}
                    <div className="container ">
                <div className="row" id='filterHold'>
                <h6 className="text-center" ></h6><button onClick={()=>this.filterrr()} type="button" className="float-right btn btn-info ml-5 mb-2 ">Filter</button>
            </div>
                <div className="row" id="filterBox" style={{display:'none'}}>
                <div className="input-group mb-3 col-md-4 col-lg-4 col-12" >
                    <div className="input-group-prepend">
                      <label className="input-group-text" >Prepage</label>
                    </div>
                    <select onChange={()=>this.productFetching()} className="custom-select" id="prePage">
                      <option value="12">12</option>
                      <option value="18">18</option>
                      <option value="24">24</option>
                    </select>
                  </div>
                  <div className="input-group mb-3 col-md-4 col-lg-4 col-12">
                    <div className="input-group-prepend">
                      <label className="input-group-text" >Category</label>
                    </div>
                    <select onChange={()=>this.productFetching()} className="custom-select" id="categ">
                      <option value="All">All</option>
                 
                    </select>
                  </div>

                  <div className="input-group mb-3 col-md-4 col-lg-4 col-12">
                    <div className="input-group-prepend">
                      <label className="input-group-text" >Sort By </label>
                    </div>
                    <select onChange={()=>this.productFetching()} className="custom-select" id="sort">
                            <option value=""> None</option>
                      <option value="price ASC">Lower Price</option>
                      <option value="price DESC">Heigher Price</option>
                      <option value="name ASC">Name A-Z</option>
                      <option value="name ASC">Name Z-A</option>
                    </select>
                </div>
                  </div>
                <hr/>
                <div>
                    {/* <!-- product display --> */}
                        <div className="row" id="productBox">
                              </div>
            
                             
                              
                </div>
                <br/>
        <br/>
        <nav>
            <ul className="pagination justify-content-center" id="paginastionBox">
              
              {/* <!-- <li class="page-item active"><span class="page-link" href="#">1</span></li> --> */}
             
            
            </ul>
          </nav>
                     {/* <!-- end product --> */}

        </div>

{/* // <!-- bigi shower --> */}
<div id="bigS"  style={{display: "none" }}className="bigS">
    {/* <!-- <span onclick="bigi()"> <i className="far fa-times-circle"></i> </span>
    <img src="" className="img-fluid" alt="Responsive image"> --> */}
</div>
<div id="bigSslide"  style={{display: "none"}} className="bigS">
<span onClick={()=>this.bigi()}> <i className="far fa-times-circle"></i> </span>
<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner" id="slideHolder">
      {/* <!-- <div className="carousel-item active"> -->
        <!-- <img className="d-block w-100" src="..." alt="First slide"> -->
      <!-- </div> --> */}
      
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

        )
    }
}


export default Product;