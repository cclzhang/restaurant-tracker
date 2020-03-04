import React, {Component} from 'react';
import firebase from './firebase';
import List from './components/List';
import Form from './components/Form';
import './App.css';


class App extends Component{
  constructor() {
    super();
    this.state = {
      favourites: [],
      wantToTry: [],
      autoComplete: false,
      userInput: '',
    }
  }
  componentDidMount() {
    const favDbRef = firebase.database().ref("favList");
    const wantDbRef = firebase.database().ref("wantList");
    favDbRef.on('value', (response) => {
      const favFromDb = response.val();
      const favToBeSet = [];
      for (let key in favFromDb) {
        const restaurantInfo = {
          key: key,
          name: favFromDb[key].name,
          url: favFromDb[key].url,
          type: favFromDb[key].type,
          data: favFromDb[key],
        }
        favToBeSet.push(restaurantInfo);
      }
      this.setState({
        favourites: favToBeSet,
      })
    });
    wantDbRef.on('value', (response) => {
      const wantFromDb = response.val();
      const wantToBeSet = [];
      for (let key in wantFromDb) {
        const restaurantInfo = {
          key: key,
          name: wantFromDb[key].name,
          url: wantFromDb[key].url,
          type: wantFromDb[key].type,
          data: wantFromDb[key],
        }
        wantToBeSet.push(restaurantInfo);
      }
      this.setState({
        wantToTry: wantToBeSet,
      })
    });
  }

  render(){
    return (
      <div className="App">
        <h1>restaurant tracker</h1>
        <Form want={this.wantButtonHandler} fav={this.favButtonHandler} popup={this.state.autoComplete} />
        <section className="allLists wrapper">
          <section className="list wantToTry">
            <h2>want to try</h2>
            <ul>
              <List listType={this.state.wantToTry} refKey="wantList"/>
            </ul>
          </section>
          <section className="list favourites">
            <h2>favourites</h2>
            <ul>
              <List listType={this.state.favourites} refKey="favList"/>
            </ul>
          </section>
        </section>
        <footer>&copy; <a href="http://cecilezhang.com/">Cecile Zhang</a> 2020 </footer>
      </div>
    );
  }
}



export default App;
