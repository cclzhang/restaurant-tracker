import React, {Component} from 'react';
import Button from './Button'

class Form extends Component {
    submitHandler(e) {
        e.preventDefault();
    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <input
                    type="search"
                    name="restaurantChoice"
                    id="restaurantChoice"
                    onChange={this.props.handleChange}
                    value={this.props.userInput}
                />
                <label htmlFor="restaurantChoice">type in the restaurant list</label>
                <button className="invisible" type="submit" tabIndex="-1">hello</button>
                <Button refKey="wantList" userInput={this.props.userInput} btnDetails="add to want list"/>
                <Button refKey="favList" userInput={this.props.userInput} btnDetails="add to fav list"/>
            </form>
        )
    }
}

export default Form;