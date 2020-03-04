import React, { Component } from 'react';
import firebase from '../firebase';
import axios from 'axios';
import '../css/Button.css'

class Button extends Component {
    buttonHandler = (e) => {
        e.preventDefault();
        const dbRef = firebase.database().ref(this.props.refKey);
        axios({
            url: 'https://developers.zomato.com/api/v2.1/search',
            method: 'GET',
            responseType: 'json',
            params: {
                apikey: '3a17fa134b021257dcadfb7e21140fdb',
                // sort: 'rating',
                q: this.props.userInput,
                count: 3,
                lat: 43.653908,
                lon: -79.384293,
                radius: 1000,
            }
        }).then((response) => {
            const array = {
                name: response.data.restaurants[0].restaurant.name,
                type: response.data.restaurants[0].restaurant.cuisines,
                url: response.data.restaurants[0].restaurant.url,
            }
            dbRef.push(array);
            this.setState({
                userInput: "",
            })
        }).catch(()=>{
            dbRef.push(this.props.userInput);
            this.setState({
                userInput: "",
            })
        })
    }

    // button = (e) =>{
    //     e.preventDefault();
    //     console.log('error')
    // }

    render(){
        return(
            !(this.props.userInput.replace(/\s/g, '')) ? <button onClick={this.button}>{this.props.btnDetails}</button>
                : <button onClick={this.buttonHandler}>{this.props.btnDetails}</button>
        )
    }
}

export default Button;