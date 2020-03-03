import React, { Component } from 'react';

class AutoComplete extends Component {
    constructor(){
        super()
        this.state = {
            target: false,
        }
    }

    render(){
        return(
            <section className="autoComplete" className={this.props.class}>
            {this.props.show.map((item, index) => {
                return (
                    <button
                        // key={item.restaurant.id} 
                        key={index}
                        // onClick={this.props.handler}
                        onClick={(item)=>{
                            this.props.handler(item);
                        }}
                    >
                        {/* <h4>{item.restaurant.name}</h4>
                        <p>{item.restaurant.location.address}</p>    */}
                        <p>{item}</p>  
                    </button>           
                )
            })}
            </section>
        )
    }
}

export default AutoComplete;