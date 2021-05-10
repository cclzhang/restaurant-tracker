import React, { Component } from 'react';
import '../css/AutoComplete.css';

class AutoComplete extends Component {
    render(){
        return(
            <section className={this.props.class}>
            {this.props.show.map((item) => {
                return (
                    <div
                        className="detailsBin"
                        key={item.restaurant.id}
                        onClick={e => this.props.handler(e, item.restaurant.name)}
                    >
                        <h4>{item.restaurant.name}</h4>
                        <p>-- {item.restaurant.location.address}</p>
                    </div>           
                )
            })}
            </section>
        )
    }
}

export default AutoComplete;