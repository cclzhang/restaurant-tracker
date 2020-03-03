import React, { Component } from 'react';

class AutoComplete extends Component {
    render(){
        return(
            <section className="autoComplete" className={this.props.class}>
            {this.props.show.map((item, index) => {
                return (
                    <div
                        className="detailsBin"
                        // key={item.restaurant.id} 
                        key={index}
                        // onClick={e => this.props.handler(e, item.restaurant.name)} 
                        onClick={e => this.props.handler(e, item)} 
                    >
                        {/* <h4>{item.restaurant.name}</h4>
                        <p>{item.restaurant.location.address}</p>    */}
                        <p>{item}</p>  
                    </div>           
                )
            })}
            </section>
        )
    }
}

export default AutoComplete;