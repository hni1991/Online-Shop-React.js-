import React from 'react';
import './Admin.css';
import '../Product/Product.css';
import '../Menu/Menu.css';
import{dbUrl}from '../../url'




class Admin extends React.Component{

    constructor(props){
        super(props)
        this.state ={

        }
        this.myurl1 = dbUrl
        this.priceFixer =this.props.priceFixer;
        this.priceS = this.props.priceS;
        this.price = '$';
        this.lastnumber = 0;
        this.oldprepage = 0;
        this.elementNumber=0;
    }





//fetch function for all modul's
 sendData1 =(url, data)=> {
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

filterrr(){
    this.filter = !this.filter
    console.log(this.filter)
    if(this.filter){
    document.getElementById('filterBox').style.display='block'
    }else{
        document.getElementById('filterBox').style.display='none'
    }
   
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
// this finction fetchin the product
 productFetching1 = (pageNumber) => {
     this.priceCheker()
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
    let data = {
        numberInPage: prepage,
        page_number: num,
        category: categ,
        sort: sort1,
        direction:direction1
    };
    this.elementNumber = prepage;
    //  let consept = {direction:'',page_number:1,numberInPage:12,category:'All'}
    this.sendData1(this.myurl1 + '/products', data)
        .then(data => {
            this.productCreator1(data)
        })
        .catch(error => console.log(error))
}
productCreator1 = (data) => {
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
       
        let input1 = document.createElement('input');
        let i1 = document.createElement('i');
        div.className = 'card col-12 col-md-3 p-2 back bf';
        img.className = 'card-img-top p-0 m-0'
        if (myData[i].photo) {
            this.imgArr = myData[i].photo.split(',,,')
            let image = this.imgArr[0]
            image.replace('public', '');
            img.src = image
        } else {

            img.src = defult
        }
      
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
        h51.innerHTML = this.priceS + " " + (myData[i].price * this.priceFixer).toFixed(2);
        div2.className = 'card-footer text-center bn1 bk'

        btn1.onclick = (e) => {
            console.log(e.target.id)
            this.delDB(e.target.id)
        }
        i1.id = myData[i].id;
        btn1.id = myData[i].id;

        i1.className = 'far fa-trash-alt redcolor'
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
       
        productBox.appendChild(div)
    }

    if (this.lastnumber !== data.data.total_number || this.oldprepage !== this.elementNumber) {
        this.oldprepage = this.elementNumber
        this.lastnumber = data.data.total_number
        let numberOfPage = Math.ceil(data.data.total_number / myData.length)
        this.pagination1(numberOfPage)

    } else {
    }
}


//pagination1
pagination1 = (num) => {
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
                this.productFetching1(e.target.innerHTML)
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
Category = () => {
    let select = document.getElementById('categ');
    let select1 = document.getElementById('cats');

    this.sendData1(this.myurl1 + '/categorySender', {}).then((result) => {
        console.log(result);
        result.forEach((item) => {
            console.log(item.category);
            let opt = document.createElement('option');
            opt.innerHTML = item.category;
            select.appendChild(opt);
          //  select1.appendChild(opt);
         
        });
        result.forEach((item) => {
            console.log(item.category);
            let opt = document.createElement('option');
            opt.innerHTML = item.category;
            select1.appendChild(opt);
          //  select1.appendChild(opt);
         
        });
    });
}
 spd = (id) =>{
    window.location.href = './singlepage.html?id=' + id

}
 delDB = (param) =>{
    this.sendData1(this.myurl1+'/removeProduct',{id:param})
    .then(data =>{
        console.log(data)
        if(data.message ==='ok'){
            this.productFetching1()
        }else{
            this.productFetching1()

           alert(data.message)
        }
    })
    .catch(error =>{
        alert(error)
    })
console.log(param)
}


 onS = ()=>{
    let form = document.getElementById('formI')
    form.addEventListener('submit',(e)=>{
        console.log(e)
        e.preventDefault()
    })
    
}
 getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

componentDidMount(){

    this.productFetching1()
    this.Category()
    //this.onS()
    this.getParameterByName('message')
}


render(){
    return(
        <div className="back">
            <br/>
            <br/>

              <div className="container">
        <ul className="nav nav-tabs mb-3 back" id="pills-tab" role="tablist">
            <li className="nav-item back1">
                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                    aria-controls="pills-home" aria-selected="true">All products</a>
            </li>
            <li className="nav-item back1">
                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                    aria-controls="pills-profile" aria-selected="false">Add new Product</a>
            </li>
            {/* <!-- <li className="nav-item">
              <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
            </li> --> */}
        </ul>
        <div className="tab-content back" id="pills-tabContent">
            {/* <!-- start All products --> */}
            <div className="tab-pane fade show active row shadowF back" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                 {/* <!-- product --> */}
            <div className="container shadowF">
                <div className="row shadowF">
                    <hr/>
                <button onClick={()=>this.filterrr()} type="button" className="float-right btn btn-info ml-5 mb-2 ">Filter</button>
            </div>
                <div className="row" id="filterBox" style={{display: "none"}}>
                <div className="input-group mb-3 col-md-4 col-lg-4 col-12" >
                    <div className="input-group-prepend">
                      <label className="input-group-text" >Prepage</label>
                    </div>
                    <select onChange={()=>this.productFetching1()} className="custom-select" id="prePage">
                      <option selected value="12">12</option>
                      <option value="18">18</option>
                      <option value="24">24</option>
                    </select>
                  </div>
                  <div className="input-group mb-3 col-md-4 col-lg-4 col-12">
                    <div className="input-group-prepend">
                      <label className="input-group-text" >Category</label>
                    </div>
                    <select onChange={()=>this.productFetching1()} className="custom-select" id="categ">
                      <option selected value="All">All</option>
                 
                    </select>
                  </div>

                  <div className="input-group mb-3 col-md-4 col-lg-4 col-12">
                    <div className="input-group-prepend">
                      <label className="input-group-text">Sort By </label>
                    </div>
                    <select onChange={()=>this.productFetching1()} className="custom-select" id="sort">
                            <option selected value=""> None</option>
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

                     {/* <!-- end product --> */}

        </div>
        {/* <!-- pagination --> */}
        <br/>
        <br/>
        <nav>
            <ul className="pagination justify-content-center" id="paginastionBox">
              
              {/* <!-- <li className="page-item active"><span className="page-link" href="#">1</span></li> --> */}
             
            
            </ul>
          </nav>
                {/* <!--End of pagination --> */}


            </div>
            {/* <!-- finish All products -->

            <!-- start insert product --> */}
            <div className="tab-pane fade shadowF back" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                    <div className="container shadowF">
                            <form action="/DB/product_insert" id="formI" method="POST" encType="multipart/form-data" className="col-8 formfix">
                              <div className="form-group">
                                <label >Name of product :</label>
                                <input type="text" name="name" placeholder="name of your product" required className="form-control" id="name" />
                              </div>
                        
                              <div className="form-group">
                                <label >Quantity :</label>
                                <input type="text" className="form-control" id="quantity" placeholder="Quantity" name="quantity"/>
                              </div>
                              <div className="form-group">
                                <label >Category :</label>
                                <select id='cats' name='category'>
                                       
                                </select>
                        
                              </div>
                              <div className="form-group">
                                <label >Price :</label>
                                <input type="number" className="form-control" id="price" placeholder="Enter price" name="price"/>
                              </div>
                              <div className="form-group">
                                <label >Date of release :</label>
                                <input type="date" className="form-control" id="date" placeholder="Enter date" name="date"/>
                              </div>
                        
                              <div className="form-group">
                                <label >Upload your images :</label>
                                <input type="file" className="form-control-file" id="fileLoader" name="fileLoader" multiple/>
                              </div>
                              <div className="form-group">
                                    <label >Description :</label>
                                    <input type="text" className="form-control" id="desc" placeholder="Description"/>
                                  </div>
                            
                              <button type="submit" className="btn btn-outline-success">Add to DB</button>
                        
                              <p id='show'></p>
                            </form>
                          </div>
            </div>
            {/* <!-- finish insert product --> */}
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
        </div>
    </div>
        </div>
    )
}


}

export default Admin;