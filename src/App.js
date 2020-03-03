import React, {Component} from 'react';
import firebase from './firebase';
// import axios from 'axios';
import List from './components/List'
import Form from './components/Form'

import './App.css';


class App extends Component{
  constructor() {
    super();
    this.state = {
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

  render(){
    return (
      <div className="App">
        <h1>restaurant saver</h1>
        <Form want={this.wantButtonHandler} fav={this.favButtonHandler}/>
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
