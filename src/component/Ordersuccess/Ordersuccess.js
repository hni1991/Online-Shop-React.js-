import React from 'react';
import './Ordersuccess.css';


class Ordersuccess extends React.Component{

    suc = () =>{
        setTimeout(()=>{
            let holder = document.getElementById('successF')
            holder.style.display ='none'
        },1000)
    }

    render(){
        return(
            <div id='successF'>
                <div className = "successC">
                <i className="fas fa-check"></i>
                <h2> Added</h2>
                </div>
                {this.suc()}
            </div>
        )
    }

}




export default Ordersuccess;