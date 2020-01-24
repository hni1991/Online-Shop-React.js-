import React from 'react';
import './Zoom.css';
import{dbUrl}from '../../url'

class Zoom extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            id : 0
        }
        this.myurl = dbUrl
        this.defult = './image/4.jpg';

    }

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
creator=()=>{

    let imageHolder = document.getElementById('slideHolder')
    this.sendData(this.myurl+'/singleProduct',{id:this.state.id})
    .then(data=>{
        if(data.message ==='Ok'){
            document.getElementById('bigSslide').style.display='block'

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
                    let im = imgArr[i].replace('public', '.');

                    img.src = im
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

       



        }
    })
}
closee=()=>{
    this.setState({
        id:0
    })
    document.getElementById('bigSslide').style.display='none'


}

    zoomer = (e)=>{
        this.setState({
            id:e
        })
        this.creator()
        console.log(e)
    }

render(){
        return(
<div id="bigSslide"  style={{display: "none"}} className="bigS">
<span onClick={()=>this.closee()}> <i className="far fa-times-circle"></i> </span>
<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner" id="slideHolder">
      {/* <!-- <div className="carousel-item active"> -->
        <!-- <img className="d-block w-100" src="..." alt="First slide"> -->
      <!-- </div> --> */}
      
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
  </div>
</div>
        )

      
   
    
    
}

}

export default Zoom;