import React, {Component} from 'react';
import axios from 'axios';
import Button from './Button'
import AutoComplete from './AutoComplete'
import '../css/Form.css'

class Form extends Component {
    constructor(props){
        super();
        this.state = {
            userInput: "",
            restaurants: [],
            autoComplete: props.popup,
        }
    }

    handleChange = (e) => {
        if (!(e.target.value.replace(/\s/g, ''))) {
            this.setState({
                autoComplete: false,
                userInput: e.target.value,
            })
        } else {
            axios({
                url: 'https://developers.zomato.com/api/v2.1/search',
                method: 'GET',
                responseType: 'json',
                params: {
                    apikey: '3a17fa134b021257dcadfb7e21140fdb',
                  // sort: 'rating',
                    q: e.target.value,
                    count: 5,
                    lat: 43.653908,
                    lon: -79.384293,
                    radius: 1000,
                }
            }).then(response=>{
                this.setState({                
                    autoComplete: true,
                    restaurants: response.data.restaurants,
                })
            }).catch(() => {
                console.log("we could not find the restaurant you were looking for")
            })
            this.setState({
                userInput: e.target.value,
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
            <form onSubmit={this.submitHandler} className="wrapper">
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
                <div className="buttonDetails">
                    <Button refKey="wantList" userInput={this.state.userInput} btnDetails="+ to wants"/>
                    <Button refKey="favList" userInput={this.state.userInput} btnDetails="+ to favourites"/>
                </div>
            </form>
        )
    }
}

export default Form;