import React, { Component } from 'react';
import firebase from '../firebase';
import axios from 'axios';

class Button extends Component {
    buttonHandler = (e) => {
        e.preventDefault();
        console.log(this.props.refKey)
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
            console.log(response.data.restaurants);
            this.findMatches(this.props.userInput, response.data.restaurants)
            this.setState({
                userInput: "",
            })
        })
    }

    findMatches = (wordToMatch, restaurants) => {
        const array = restaurants.filter(restaurant => {
            const regEx = new RegExp(wordToMatch);
            return restaurant.restaurant;
            // console.log(restaurant)
        })
        // console.log(array.map((restaurant)=>{
        //   console.log(restaurant.restaurant.name)
        //   console.log(restaurant.restaurant.url)
        // }))
    }

    render(){
        return(
        <button onClick={this.buttonHandler}>{this.props.btnDetails}</button>
        )
    }
}

export default Button;