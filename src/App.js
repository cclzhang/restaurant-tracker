import React, {Component} from 'react';
import firebase from './firebase';
import axios from 'axios';
import FavList from './components/FavList.js';
import List from './components/list.js'
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';


class App extends Component{
  constructor() {
    super();
    this.state = {
      favourites: [],
      wantToTry: [],
      userInput: "",
    }
  }
  componentDidMount() {
    const favDbRef = firebase.database().ref("favList");
    const wantDbRef = firebase.database().ref("wantList");
    favDbRef.on('value', (response) => {
      // console.log(response.val())
      const favFromDb = response.val();
      const favToBeSet = [];
      for (let key in favFromDb) {
        const restaurantInfo = {
          key: key,
          name: favFromDb[key],
        }
        favToBeSet.push(restaurantInfo);
      }
      this.setState({
        favourites: favToBeSet,
      })
    });
    wantDbRef.on('value', (response) => {
      // console.log(response.val())
      const wantFromDb = response.val();
      const wantToBeSet = [];
      for (let key in wantFromDb) {
        const restaurantInfo = {
          key: key,
          name: wantFromDb[key].name,
          url: wantFromDb[key].url,
        }
        wantToBeSet.push(restaurantInfo);
        // console.log(wantFromDb[key]);
      }
      this.setState({
        wantToTry: wantToBeSet,
      })
    });
  }

  handleChange = (e) => {
    // console.log('things are changing', e.target.value);


    this.setState({
      userInput: e.target.value,
    })


  }

  wantButtonHandler= (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref("wantList");


    axios({
      url: 'https://developers.zomato.com/api/v2.1/search',
      method: 'GET',
      responseType: 'json',
      params: {
        apikey: '3a17fa134b021257dcadfb7e21140fdb',
        // sort: 'rating',
        q: this.state.userInput,
        count: 3,
        lat: 43.653908,
        lon: -79.384293,
        radius: 1000,
      }
    }).then((response) => {
      const array = {
        name: response.data.restaurants[0].restaurant.name,
        url: response.data.restaurants[0].restaurant.url
      }
      dbRef.push(array);
      // console.log(response.data.restaurants);
      this.findMatches(this.state.userInput, response.data.restaurants)
      this.setState({
        userInput: "",
      })
    })
  }

  findMatches = (wordToMatch, restaurants) =>{
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



  favButtonHandler = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref("favList");
    dbRef.push(this.state.userInput);
    axios({
      url: 'https://developers.zomato.com/api/v2.1/search',
      method: 'GET',
      responseType: 'json',
      params: {
        apikey: '3a17fa134b021257dcadfb7e21140fdb',
        // sort: 'rating',
        q: this.state.userInput,
        count: 3,
        lat: 43.653908,
        lon: -79.384293,
        radius: 1000,
      }
    }).then((response) => {
      // console.log(response.data);
      this.setState({
        userInput: "",
      })
    })
  }

  removeFav = (restaurantKey) => {
    const dbRef = firebase.database().ref("favList");
    dbRef.child(restaurantKey).remove();
  }

  removeWant = (restaurantKey) => {
    const dbRef = firebase.database().ref("wantList");
    dbRef.child(restaurantKey).remove();
  }

  render(){
    return (
      <div className="App">
        <h1>hello world</h1>
        <form>
          <input 
            type="text" 
            name="restaurantChoice" 
            id="restaurantChoice"
            onChange={this.handleChange}
            value={this.state.userInput}
          />
          <label htmlFor="restaurantChoice">type in the restaurant list</label>
          <button onClick={this.wantButtonHandler}>add to want list</button>
          <button onClick={this.favButtonHandler}>add to favourite list</button>
        </form>
        <section className="autocomplete wrapper"></section>
        <section className="allLists wrapper">
          <section className="list wantToTry">
            <h3>want to try</h3>
            <ul>
              <List listType={this.state.wantToTry}/>
            </ul>
          </section>
          {/* <FavList /> */}
          <section className="list favourites">
            <h3>favourite restaurants</h3>
            <ul>
              <List listType={this.state.favourites} />
            </ul>
          </section>
        </section>
      </div>
    );
  }
}



export default App;
