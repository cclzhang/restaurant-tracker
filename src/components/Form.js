import React, {Component} from 'react';
import axios from 'axios';
import Button from './Button'
import AutoComplete from './AutoComplete'

class Form extends Component {
    constructor(){
        super();
        this.state = {
            userInput: "",
            restaurants: [],
            autoComplete: false,
        }
    }

    handleChange = (e) => {
        if (!(e.target.value.replace(/\s/g, ''))) {
            console.log("empty")
            this.setState({
                autoComplete: false,
                userInput: e.target.value,
            })
        } else {
            console.log(e.target.value);
            // axios({
            //     url: 'https://developers.zomato.com/api/v2.1/search',
            //     method: 'GET',
            //     responseType: 'json',
            //     params: {
            //         apikey: '3a17fa134b021257dcadfb7e21140fdb',
            //       // sort: 'rating',
            //         q: e.target.value,
            //         count: 5,
            //         lat: 43.653908,
            //         lon: -79.384293,
            //         radius: 1000,
            //     }
            // }).then(response=>{
            //     console.log(response.data.restaurants);
            //     this.setState({                
            //         autoComplete: true,
            //         restaurants: response.data.restaurants,
            //     })
            // }).catch(error=>{
            //     console.log(error);
            // })
            // this.setState({
            //     userInput: e.target.value,
            // })
            const array = ["hi", "hello", "again", "test", "trail"]
            this.setState({
                userInput: e.target.value,
                autoComplete: true,
                restaurants: array,
            })
        }
    }

    selectedHandler = (e, item) => {
        e.preventDefault();
        this.setState({
            userInput: item,
            autoComplete: !this.state.autoComplete,
        })
    }
    handleKeyPress = (keyPressed) => {
        console.log(keyPressed.key)
        if (keyPressed.key === 'Enter') {
            this.setState({
                autoComplete: !this.state.autoComplete,
            })
        }
    }


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
                    onChange={this.handleChange}
                    value={this.state.userInput}
                    onKeyPress={this.handleKeyPress}
                />
                {this.state.autoComplete 
                    ? <AutoComplete 
                        class="autoComplete" 
                        show={this.state.restaurants} 
                        handler={this.selectedHandler} 
                    /> 
                    : <AutoComplete 
                        class="invisible" 
                        show={this.state.restaurants} 
                        handler={this.selectedHandler} 
                    />
                }
                <label htmlFor="restaurantChoice">type in the restaurant list</label>
                <button className="invisible" type="submit" tabIndex="-1"></button>
                <Button refKey="wantList" userInput={this.state.userInput} btnDetails="add to want list"/>
                <Button refKey="favList" userInput={this.state.userInput} btnDetails="add to fav list"/>
            </form>
        )
    }
}

export default Form;