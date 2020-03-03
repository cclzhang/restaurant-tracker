import React, {Component} from 'react';
import firebase from './firebase';
import axios from 'axios';
import List from './components/List'
import Form from './components/Form'
import AutoComplete from './components/AutoComplete'

import './App.css';


class App extends Component{
  constructor() {
    super();
    this.state = {
      userInput: "",
      restaurants: [],
      autoComplete: false,
      favourites: [],
      wantToTry: [],
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
          name: favFromDb[key].name,
          url: favFromDb[key].url,
          type: favFromDb[key].type,
        }
        favToBeSet.push(restaurantInfo);
        // console.log(wantFromDb[key]);
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
          type: wantFromDb[key].type,
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
    if (!e.target.value){
      console.log("empty")
      this.setState({
        autoComplete: false,
      })
    }else if(!(e.target.value.replace(/\s/g, ''))){
      console.log("error")
      this.setState({
        autoComplete: false,
      })
    }else{
      console.log(e.target.value);
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
          console.log(response.data.restaurants);
          this.setState({
            autoComplete: true,
            restaurants: response.data.restaurants,
          })
        }).catch(error=>{
          console.log(error);

        })
      this.setState({
        userInput: e.target.value,
      })
    }
  }

  render(){
    return (
      <div className="App">
        <h1>restaurant saver</h1>
        <div className="box">
          <Form handleChange={this.handleChange} userInput={this.state.userInput} want={this.wantButtonHandler} fav={this.favButtonHandler}/>
        {this.state.autoComplete ? <AutoComplete class="autoComplete" show={this.state.restaurants} /> : <AutoComplete class="invisible" show={this.state.restaurants} />}
        </div>
        <section className="allLists wrapper">
          <section className="list wantToTry">
            <h3>want to try</h3>
            <ul>
              <List listType={this.state.wantToTry} refKey="wantList"/>
            </ul>
          </section>
          <section className="list favourites">
            <h3>favourite restaurants</h3>
            <ul>
              <List listType={this.state.favourites} refKey="favList"/>
            </ul>
          </section>
        </section>
      </div>
    );
  }
}



export default App;
