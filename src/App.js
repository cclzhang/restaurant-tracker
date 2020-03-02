import React, {Component} from 'react';
import firebase from './firebase';
import axios from 'axios';
import './App.css';

// const userPrompt = prompt("what do you want to search").replace(/\s/g, '');

class App extends Component{
  constructor() {
    super();
    this.state = {
      favourites: [],
      wantToTry: [],
      userInput: '',
    }
  }
  componentDidMount() {

    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const dataFromDb = response.val();
      console.log(dataFromDb);

      const stateToBeSet = [];

      for (let key in dataFromDb) {
        const restaurantInfo = {
          key: key,
          name: dataFromDb[key],
        }
        stateToBeSet.push(restaurantInfo);
      }
      console.log(stateToBeSet);

      this.setState({
        favourites: stateToBeSet,
      })
    })

    axios({
      url: 'https://developers.zomato.com/api/v2.1/search',
      method: 'GET',
      responseType: 'json',
      params: {
        apikey: '3a17fa134b021257dcadfb7e21140fdb',
        // sort: 'rating',
        q: this.state.userInput,
        count: 30,
        lat: 43.653908,
        lon: -79.384293,
        radius: 1000,
      }
    }).then((response) => {
      console.log(response.data);
    })
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
    dbRef.push(this.state.userInput);
    this.setState({
      userInput: "",
    })
  }
  // submitHandler = (e) => {
  //   e.preventDefault();
  //   const dbRef = firebase.database().ref();
  //   dbRef.push(this.state.userInput);
  //   this.setState({
  //     userInput: "",
  //   })
  // }

  favButtonHandler = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref("favList");
    dbRef.push(this.state.userInput);
    this.setState({
      userInput: "",
    })
  }

  removeRestaurant = (restaurantKey) => {
    const dbRef = firebase.database().ref();
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
        <section className="want-to-try">
          <h3>want to try</h3>
          <ul>
            {this.state.favourites.map((restaurant) => {
              return (
                <li key={restaurant.key}>
                  <p>{restaurant.name} {restaurant.key}></p>
                  <button onClick={() => { this.removeRestaurant(restaurant.key) }}>Remove Restaurant</button>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="favourites">
          <h3>favourite restaurants</h3>
          <ul>
            {this.state.wantToTry.map((restaurant) => {
              return(
                <li key = {restaurant.key } >
                  <p>{restaurant.name}></p>
                    <button onClick={() => { this.removeRestaurant(restaurant.key) }}>Remove Restaurant</button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
