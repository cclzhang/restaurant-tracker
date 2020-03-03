import React, { Component } from 'react';

class AutoComplete extends Component {
    render(){
        return(
            <section className="autoComplete" className={this.props.class}>
            {this.props.show.map((item) => {
                return (
                    <div key={item.restaurant.id}>
                        <h4>{item.restaurant.name}</h4>
                        <p>{item.restaurant.location.address}</p>     
                    </div>           
                )
            })}
            </section>
        )
    }
}

export default AutoComplete;