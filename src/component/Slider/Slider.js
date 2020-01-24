import React from 'react';
import './Slider.css';


class Slider extends React.Component{

    render(){
        return(
            <div className="back">
              <br/>
                 <div className="flex-wrap col-12 mt-2">
        <div className="container">
            <div className="row ">
            <div className="col-md-4 col-12 col-sm-12 ">
                <div className="col-md-12 col-6  col-sm-6 float-left goldenline p-0">
                    <img  className="d-block w-100 img-responsive image " src="./image/3.jpg" alt={"left "}/>
                </div>
                <div className="col-md-12 col-6  col-sm-6 float-left mt-2 goldenline p-0">
                    <img  className="d-block w-100 img-responsive image " src="./image/4.jpg" alt="lefte "/>
                </div>
            </div>
        
        
            <div className="col-md-8 col-12 col-sm-12 ">
            <div id="carouselExampleIndicators" className="carousel slide " data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img className="d-block w-100" src="./image/3.jpg" alt="First slide"/>
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="./image/2.jpg" alt="Second slide"/>
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon " aria-hidden="true"></span>
                      <span className="sr-only bk-r">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span className="carousel-control-next-icon " aria-hidden="true"></span>
                      <span className="sr-only bk-r">Next</span>
                    </a>
                  </div>
                </div>
            </div>
        </div>
            </div>
            <br/>
            <hr/>
            <br/>
            </div>
        )
    }

}

export default Slider