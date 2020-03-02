import React, {Component} from 'react';
import Button from './Button'

class Form extends Component {
    render(){
        return(
            <form>
                <input
                    type="text"
                    name="restaurantChoice"
                    id="restaurantChoice"
                    onChange={this.props.handleChange}
                    value={this.props.userInput}
                />
                <label htmlFor="restaurantChoice">type in the restaurant list</label>
                <Button refKey="wantList" userInput={this.props.userInput} btnDetails="add to want list"/>
                <Button refKey="favList" userInput={this.props.userInput} btnDetails="add to fav list"/>
                {/* <button onClick={this.props.want}>add to want list</button>
                <button onClick={this.props.fav}>add to favourite list</button> */}
            </form>
        )
    }
}

export default Form;